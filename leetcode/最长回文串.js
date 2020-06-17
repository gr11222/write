var longestPalindrome = function(s) {
    const length = s.length;
    if (length == 0 || length == 1) {
        return length
    }
    const arr = [];
    let str = "";
    // 子串加长度
    for (var i = 0; i < length; i++) {
        // 子串起始位置
        for (var idx = 0; idx + i <= length; idx++) {
            !arr[idx] ? arr[idx] = [] : false;
            // 子串长度end
            let end = idx + i;
            if (i === 0)
                arr[idx][end] = true;
            else if (i === 1) {
                arr[idx][end] = s[idx] === s[end]
            } else {
                arr[idx][end] = s[idx] === s[end] && arr[idx + 1][end - 1]
            }
            if (arr[idx][end] && (i + 1 > str.length)) {
                str = s.substring(idx, end + 1)
            }
        }
    }
    return str
}

var longestPalindrome = function(s) {
    if (!s || s === "") return s;
    let max = s[0]; //最长回文子串
    let loop = 0; //循环次数

    while (loop < s.length) {
        let idx = loop; //开始下标
        let n = 0; //向两边扩展的累计变量
        //从开始下标向两边扩展的累计变量
        let n = 0;
        //相同的个数 
        //例如 aaa"a"aac same为2
        //     aac"a"cac same为0
        let same = 0;
        //例如 caaca"a"acaab same为1 如果没有这个判断终止same为4
        let isBreak = false;
        //先正常遍历 同时算出same （此时中心为1个数）
        while (idx - n - 1 >= 0 && s[idx - n - 1] == s[idx + n + 1]) {
            //当没有中断且下一个字符与开始下标字符相等，same累计
            if (!isBreak && s[idx] == s[idx + n + 1]) {
                same++;
            } else {
                isBreak = true;
            }
            n++;
        }
        max = n * 2 + 1 > max.length ? s.slice(idx - n, idx + n + 1) : max;
        //当存在与开始下标连续且相同的字符，且前等后不等（此时中心为2个数）
        //例如 abc"c"ccdd 条件满足same为1 这个时候就把中间的两个c 当成中心,再开始向两边扩展
        //     abcc"c"cdd 条件不满足same为1，因为与 abc"c"ccdd 重复了，没必要再走一遍
        //     a"a"aa 条件满足same为1 
        if (s[idx] == s[idx + same + 1] && s[idx] != s[idx - same - 1]) {
            n = same;
            while (idx - n - 1 >= 0 && s[idx - n - 1] == s[idx + n + 2]) {
                n++;
            }
            max = n * 2 + 2 > max.length ? s.slice(idx - n, idx + n + 2) : max;
        }
        loop++;
    }
    return max;
};

public String longestPalindrome(String s) {
    // 特判
    int len = s.length();
    if (len < 2) {
        return s;
    }

    int maxLen = 1;
    int begin = 0;

    // dp[i][j] 表示 s[i, j] 是否是回文串
    boolean[][] dp = new boolean[len][len];
    char[] charArray = s.toCharArray();

    for (int i = 0; i < len; i++) {
        dp[i][i] = true;
    }
    for (int j = 1; j < len; j++) {
        for (int i = 0; i < j; i++) {
            if (charArray[i] != charArray[j]) {
                dp[i][j] = false;
            } else {
                if (j - i < 3) {
                    dp[i][j] = true;
                } else {
                    dp[i][j] = dp[i + 1][j - 1];
                }
            }

            // 只要 dp[i][j] == true 成立，就表示子串 s[i..j] 是回文，此时记录回文长度和起始位置
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1;
                begin = i;
            }
        }
    }
    return s.substring(begin, begin + maxLen);
}

def longestPalindrome(self, s: str) - > str:
    n = len(s)
dp = [
    [False] * n
    for _ in range(n)
]
ans = ""
# 枚举子串的长度 l + 1
for l in range(n):
    # 枚举子串的起始位置 i， 这样可以通过 j = i + l 得到子串的结束位置
for i in range(n):
    j = i + l
if j >= len(s):
    break
if l == 0:
    dp[i][j] = True
elif l == 1:
    dp[i][j] = (s[i] == s[j])
else :
    dp[i][j] = (dp[i + 1][j - 1] and s[i] == s[j])
if dp[i][j] and l + 1 > len(ans):
    ans = s[i: j + 1]
return ans