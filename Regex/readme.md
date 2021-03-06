
[正则](https://juejin.im/post/5965943ff265da6c30653879
###模糊匹配

####横向模糊匹配
比如/ab{2,5}c/表示匹配这样一个字符串：第一个字符是“a”，接下来是2到5个字符“b”，最后是字符“c”

####纵向模糊匹配
譬如[abc]，表示该字符是可以字符“a”、“b”、“c”中的任何一个。

###字符组

####范围表示法

比如[123456abcdefGHIJKLM]，可以写成[1-6a-fG-M] 用连字符-来省略和简写。
匹配-、a、z中的一个-放在[-az]或[az-]或[a\-z]

####排除字符组
例如[^abc]，表示是一个除"a"、"b"、"c"之外的任意一个字符

* \d就是[0-9]。表示是一位数字。记忆方式：其英文是digit（数字）。
* \D就是[^0-9]。表示除数字外的任意字符。
* \w就是[0-9a-zA-Z_]。表示数字、大小写字母和下划线。记忆方式：w是word的简写，也称单词字符。
* \W是[^0-9a-zA-Z_]。非单词字符。
* \s是[ \t\v\n\r\f]。表示空白符，包括空格、水平制表符、垂直制表符、换行符、回车符、换页符。记忆方式：s是space character的首字母。
* \S是[^ \t\v\n\r\f]。 非空白符。
* .就是[^\n\r\u2028\u2029]。通配符，表示几乎任意字符。换行符、回车符、行分隔符和段分隔符除外。记忆方式：想想省略号...中的每个点，都可以理解成占位符，表示任何类似的东西。
* 如果要匹配任意字符怎么办？可以使用[\d\D]、[\w\W]、[\s\S]和[^]中任何的一个

###量词

{m,} 表示至少出现m次。{m} 等价于{m,m}，表示出现m次。? 等价于{0,1}，表示出现或者不出现。记忆方式：问号的意思表示，有吗？+ 等价于{1,}，表示出现至少一次。记忆方式：加号是追加的意思，得先有一个，然后才考虑追加。* 等价于{0,}，表示出现任意次，有可能不出现。记忆方式：看看天上的星星，可能一颗没有，可能零散有几颗，可能数也数不过来。

####贪婪
var regex = /\d{2,5}/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) ); 
// => ["123", "1234", "12345", "12345"]

####惰性
var regex = /\d{2,5}?/g;
var string = "123 1234 12345 123456";
console.log( string.match(regex) ); 
// => ["12", "12", "34", "12", "34", "12", "34", "56"]

通过在量词后面加个问号就能实现惰性匹配，因此所有惰性匹配情形如下：
* {m,n}?
* {m,}?
* ??
* +?
* *?
***

###多选分支
一个模式可以实现横向和纵向模糊匹配。而多选分支可以支持多个子模式任选其一。
具体形式如下：(p1|p2|p3)，其中p1、p2和p3是子模式，用|（管道符）分隔，表示其中任何之一。
var regex = /good|nice/g;
var string = "good idea, nice try.";
console.log( string.match(regex) ); 
分支结构也是惰性的，即当前面的匹配上了，后面的就不再尝试了
var regex = /good|goodbye/g;
var string = "goodbye";
console.log( string.match(regex) ); 
// => ["good"]

##正则表达式位置匹配

### ^ $ \b \B (?=p) (?!p)
var result = "hello".replace(/^|$/g, '#');
console.log(result); 
// => "#hello#"

\b是单词边界，具体就是\w和\W之间的位置，也包括\w和^之间的位置，也包括\w和$之间的位置。
var result = "[JS] Lesson_01.mp4".replace(/\b/g, '#');
console.log(result); 
// => "[#JS#] #Lesson_01#.#mp4#"

此时我们可以看看"[#JS#] #Lesson_01#.#mp4#"中的每一个"#"，是怎么来的。
第一个"#"，两边是"["与"J"，是\W和\w之间的位置。
第二个"#"，两边是"S"与"]"，也就是\w和\W之间的位置。
第三个"#"，两边是空格与"L"，也就是\W和\w之间的位置。
第四个"#"，两边是"1"与"."，也就是\w和\W之间的位置。
第五个"#"，两边是"."与"m"，也就是\W和\w之间的位置。
第六个"#"，其对应的位置是结尾，但其前面的字符"4"是\w，即\w和$之间的位置。


(?=p)和(?!p)(?=p)，其中p是一个子模式，即p前面的位置。比如(?=l)，表示'l'字符前面的位置
例如：var result = "hello".replace(/(?=l)/g, '#');
console.log(result); 
// => "he#l#lo"
而(?!p)就是(?=p)的反面意思，比如：

var result = "hello".replace(/(?!l)/g, '#');

console.log(result); 
// => "#h#ell#o#"