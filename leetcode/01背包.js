const tList = [1, 2, 3, 4, 5]  // 物品体积
const vList = [3, 4, 10, 7, 4] // 物品价值
// 穷举表格 f[i,j] = Max{ f[i-1,j-Wi]+Pi( j >= Wi ),  f[i-1,j] }
function getbag (i, v) {
	if(i === 0){
		if(tList[i]>v){
			return 0
		}else{
			return vList[0]
		}
	}
	if(v>=tList[i]){
		return Math.max(getbag(i - 1, v), vList[i] + getbag(i - 1, v - tList[i]))    
	}else{
		return getbag(i-1,v)
	}
}
console.log(getbag(tList.length, 10))

// 全背包
var w = [1,2,3,4,5,1,2,3];
var v = [2,30,3,4,13,3,10,3];
var res = 0;
function fn(i,s){
	if(i<0){
		return 0;
	}	
	if(s>=w[i]){
		var max = fn(i-1,s);
		for (var j = 1; j*w[i] <= s; j++) {
			max = Math.max(max,fn(i-1,s-w[i]*j)+v[i]*j)
		}
		return max;
	}
	else
		return fn(i-1,s)
}
public class MaxBag {
    static int n;           // 描述物品个数
    static int c;           // 描述背包容量
    static int[] value;     // 描述物品价值
    static int[] weight;    // 描述物品重量

    public static void main(String[] args) {
        // 初始赋值操作
        value = new int[]{1500, 3000, 2000};
        weight = new int[]{1, 4, 3};
        c = 4;
        n = 3;

        // 构造最优解的网格:3行4列
        int[][] maxValue = new int[n][c];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < c; j++) {
                maxValue[i][j] = 0;
            }
        }   // end for

        // 填充网格
        for (int i = 0; i < n; i++) {
            for (int j = 1; j <= c; j++) {
                if (i == 0) {
                    maxValue[i][j - 1] = (weight[i] <= j ? value[i] : 0);
                } else {
                    int topValue = maxValue[i - 1][j - 1];  // 上一个网格的值
                    int thisValue = (weight[i] <= j ?       // 当前商品的价值 + 剩余空间的价值
                            (j - weight[i] > 0 ? value[i] + maxValue[i - 1][j - weight[i]] : value[i])
                            : topValue);

                    // 返回 topValue和thisValue中较大的一个
                    maxValue[i][j - 1] = (topValue > thisValue ? topValue : thisValue);
                }   // end if
            }   // end inner for
        }   // end outer for

        // 打印结果二维数组maxValue
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < c; j++) {
                System.out.printf("%6d", maxValue[i][j]);
            }
            System.out.println();
        }
    }
}