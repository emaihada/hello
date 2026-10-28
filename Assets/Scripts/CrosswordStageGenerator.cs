using System;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class WordEntry
{
    public string word;
    public string hint;
    public string category;
    public string level;
    public string origin;
}

[Serializable]
public class WordDatabase
{
    public int totalCount;
    public List<WordEntry> words;
}

public enum WordDirection
{
    Horizontal,
    Vertical
}

[Serializable]
public class CrosswordWordData
{
    public int x;
    public int y;
    public WordDirection direction;
    public char[] chars;
    public string word;
    public string hint;
    public string category;
    public string level;
    public string origin;
}

/// <summary>
/// 100% 오프라인 상태에서 Assets/Resources/wordcross_words-v2.json 단어장을 읽어
/// 15x15 격자 위에 20~25개의 교차 단어를 배치하는 십자말풀이 스테이지 생성기.
/// </summary>
public class CrosswordStageGenerator : MonoBehaviour
{
    public const int GRID_SIZE = 15;
    public const int MIN_WORDS = 20;
    public const int MAX_WORDS = 25;

    private WordDatabase _wordDatabase;
    private Dictionary<char, List<WordEntry>> _charIndex;
    private List<WordEntry> _filteredWords;
    private bool _isInitialized = false;

    /// <summary>
    /// Resources.Load와 JsonUtility를 사용해 단어장을 불러오고
    /// Dictionary<char, List<WordEntry>> 글자별 역인덱스를 미리 구축합니다.
    /// </summary>
    public void InitializeWordIndex()
    {
        if (_isInitialized) return;

        // Assets/Resources/wordcross_words-v2.json 로드 (확장자 제외)
        TextAsset jsonAsset = Resources.Load<TextAsset>("wordcross_words-v2");
        if (jsonAsset == null)
        {
            Debug.LogError("[CrosswordStageGenerator] Assets/Resources/wordcross_words-v2.json 파일을 찾을 수 없습니다.");
            return;
        }

        _wordDatabase = JsonUtility.FromJson<WordDatabase>(jsonAsset.text);
        _charIndex = new Dictionary<char, List<WordEntry>>();
        _filteredWords = new List<WordEntry>();

        HashSet<string> seenWords = new HashSet<string>();

        if (_wordDatabase != null && _wordDatabase.words != null)
        {
            foreach (WordEntry entry in _wordDatabase.words)
            {
                if (entry == null || string.IsNullOrEmpty(entry.word) || string.IsNullOrEmpty(entry.hint))
                    continue;

                string cleanWord = entry.word.Trim();
                if (cleanWord.Length < 2 || cleanWord.Length > 5)
                    continue;
                if (!seenWords.Add(cleanWord))
                    continue;

                entry.word = cleanWord;
                _filteredWords.Add(entry);

                // 한 단어 내 중복 글자 방지 후 Dictionary<char, List<WordEntry>> 인덱싱
                HashSet<char> uniqueChars = new HashSet<char>(cleanWord.ToCharArray());
                foreach (char c in uniqueChars)
                {
                    if (!_charIndex.TryGetValue(c, out List<WordEntry> list))
                    {
                        list = new List<WordEntry>();
                        _charIndex[c] = list;
                    }
                    list.Add(entry);
                }
            }
        }

        _isInitialized = true;
    }

    /// <summary>
    /// stageNumber를 시드로 사용하여 항상 동일하고 일정한 15x15 십자말풀이 격자 데이터를 생성해 반환합니다.
    /// </summary>
    public List<CrosswordWordData> GenerateStage(int stageNumber)
    {
        InitializeWordIndex();

        if (_filteredWords == null || _filteredWords.Count == 0)
            return new List<CrosswordWordData>();

        int targetWordCount = MIN_WORDS + (Mathf.Abs(stageNumber * 7) % (MAX_WORDS - MIN_WORDS + 1));
        List<CrosswordWordData> bestResult = new List<CrosswordWordData>();

        for (int attempt = 0; attempt < 5; attempt++)
        {
            // 동일한 stageNumber 입력 시 항상 같은 퍼즐이 생성되도록 시드 고정
            UnityEngine.Random.InitState(stageNumber * 10007 + attempt * 7919);
            List<CrosswordWordData> candidate = TryBuildCrosswordGrid(targetWordCount);

            if (candidate.Count > bestResult.Count)
            {
                bestResult = candidate;
            }
            if (bestResult.Count >= targetWordCount)
            {
                break;
            }
        }

        return bestResult;
    }

    private List<CrosswordWordData> TryBuildCrosswordGrid(int targetCount)
    {
        char[,] gridChar = new char[GRID_SIZE, GRID_SIZE];
        bool[,] gridHoriz = new bool[GRID_SIZE, GRID_SIZE];
        bool[,] gridVert = new bool[GRID_SIZE, GRID_SIZE];

        List<CrosswordWordData> placedWords = new List<CrosswordWordData>();
        HashSet<string> usedWords = new HashSet<string>();

        // 1. 첫 단어를 중앙 부근에 가로로 배치
        WordEntry seedEntry = _filteredWords[UnityEngine.Random.Range(0, _filteredWords.Count)];
        int startX = (GRID_SIZE - seedEntry.word.Length) / 2;
        int startY = GRID_SIZE / 2;
        PlaceWord(seedEntry, startX, startY, WordDirection.Horizontal, gridChar, gridHoriz, gridVert, placedWords, usedWords);

        // 2. Dictionary<char, List<WordEntry>> 인덱스를 활용해 가로/세로 교차 단어 연속 배치
        int stalledRounds = 0;
        while (placedWords.Count < targetCount && stalledRounds < 8)
        {
            bool placedInRound = false;
            List<int> order = CreateShuffledIndices(placedWords.Count);

            WordEntry bestEntry = null;
            int bestX = 0, bestY = 0;
            WordDirection bestDir = WordDirection.Horizontal;
            float bestScore = -9999f;

            foreach (int wIdx in order)
            {
                CrosswordWordData anchorWord = placedWords[wIdx];
                WordDirection perpDir = anchorWord.direction == WordDirection.Horizontal
                    ? WordDirection.Vertical
                    : WordDirection.Horizontal;

                int dx = anchorWord.direction == WordDirection.Horizontal ? 1 : 0;
                int dy = anchorWord.direction == WordDirection.Horizontal ? 0 : 1;

                List<int> charOrder = CreateShuffledIndices(anchorWord.chars.Length);
                foreach (int i in charOrder)
                {
                    int ax = anchorWord.x + i * dx;
                    int ay = anchorWord.y + i * dy;
                    char anchorChar = anchorWord.chars[i];

                    if (!_charIndex.TryGetValue(anchorChar, out List<WordEntry> candidates))
                        continue;

                    int checkCount = Mathf.Min(candidates.Count, 32);
                    for (int k = 0; k < checkCount; k++)
                    {
                        WordEntry cand = candidates[UnityEngine.Random.Range(0, candidates.Count)];
                        if (usedWords.Contains(cand.word))
                            continue;

                        char[] candChars = cand.word.ToCharArray();
                        for (int cIdx = 0; cIdx < candChars.Length; cIdx++)
                        {
                            if (candChars[cIdx] != anchorChar)
                                continue;

                            int cx = perpDir == WordDirection.Horizontal ? ax - cIdx : ax;
                            int cy = perpDir == WordDirection.Vertical ? ay - cIdx : ay;

                            int intersections = CanPlaceWord(candChars, cx, cy, perpDir, true, gridChar, gridHoriz, gridVert);
                            if (intersections > 0)
                            {
                                float score = intersections * 50f + UnityEngine.Random.Range(0f, 10f);
                                if (score > bestScore)
                                {
                                    bestScore = score;
                                    bestEntry = cand;
                                    bestX = cx;
                                    bestY = cy;
                                    bestDir = perpDir;
                                }
                            }
                        }
                    }
                }
            }

            if (bestEntry != null)
            {
                PlaceWord(bestEntry, bestX, bestY, bestDir, gridChar, gridHoriz, gridVert, placedWords, usedWords);
                placedInRound = true;
            }

            if (!placedInRound)
                stalledRounds++;
        }

        return placedWords;
    }

    private int CanPlaceWord(
        char[] chars,
        int x,
        int y,
        WordDirection dir,
        bool requireIntersection,
        char[,] gridChar,
        bool[,] gridHoriz,
        bool[,] gridVert)
    {
        int len = chars.Length;
        int dx = dir == WordDirection.Horizontal ? 1 : 0;
        int dy = dir == WordDirection.Horizontal ? 0 : 1;

        if (x < 0 || y < 0) return -1;
        if (x + (len - 1) * dx >= GRID_SIZE || y + (len - 1) * dy >= GRID_SIZE) return -1;

        // 단어 시작 전 칸과 끝 다음 칸이 비어 있어야 함
        int bx = x - dx, by = y - dy;
        if (bx >= 0 && by >= 0 && gridChar[by, bx] != '\0') return -1;

        int ax = x + len * dx, ay = y + len * dy;
        if (ax < GRID_SIZE && ay < GRID_SIZE && gridChar[ay, ax] != '\0') return -1;

        int intersections = 0;
        for (int i = 0; i < len; i++)
        {
            int cx = x + i * dx;
            int cy = y + i * dy;
            char existing = gridChar[cy, cx];

            if (existing != '\0')
            {
                if (existing != chars[i]) return -1;
                if (dir == WordDirection.Horizontal && gridHoriz[cy, cx]) return -1;
                if (dir == WordDirection.Vertical && gridVert[cy, cx]) return -1;
                intersections++;
            }
            else
            {
                if (dir == WordDirection.Horizontal)
                {
                    if (cy > 0 && gridChar[cy - 1, cx] != '\0') return -1;
                    if (cy < GRID_SIZE - 1 && gridChar[cy + 1, cx] != '\0') return -1;
                }
                else
                {
                    if (cx > 0 && gridChar[cy, cx - 1] != '\0') return -1;
                    if (cx < GRID_SIZE - 1 && gridChar[cy, cx + 1] != '\0') return -1;
                }
            }
        }

        if (requireIntersection && intersections == 0) return -1;
        return intersections;
    }

    private void PlaceWord(
        WordEntry entry,
        int x,
        int y,
        WordDirection dir,
        char[,] gridChar,
        bool[,] gridHoriz,
        bool[,] gridVert,
        List<CrosswordWordData> placedWords,
        HashSet<string> usedWords)
    {
        char[] chars = entry.word.ToCharArray();
        int dx = dir == WordDirection.Horizontal ? 1 : 0;
        int dy = dir == WordDirection.Horizontal ? 0 : 1;

        for (int i = 0; i < chars.Length; i++)
        {
            int cx = x + i * dx;
            int cy = y + i * dy;
            gridChar[cy, cx] = chars[i];
            if (dir == WordDirection.Horizontal) gridHoriz[cy, cx] = true;
            else gridVert[cy, cx] = true;
        }

        usedWords.Add(entry.word);
        placedWords.Add(new CrosswordWordData
        {
            x = x,
            y = y,
            direction = dir,
            chars = chars,
            word = entry.word,
            hint = entry.hint,
            category = entry.category,
            level = entry.level,
            origin = entry.origin
        });
    }

    private List<int> CreateShuffledIndices(int count)
    {
        List<int> list = new List<int>(count);
        for (int i = 0; i < count; i++) list.Add(i);
        for (int i = count - 1; i > 0; i--)
        {
            int j = UnityEngine.Random.Range(0, i + 1);
            int temp = list[i];
            list[i] = list[j];
            list[j] = temp;
        }
        return list;
    }
}
