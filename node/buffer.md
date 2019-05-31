// 创建一个长度为 10、且用零填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');


Buffer 可以使用 for..of 进行迭代

--------------allocUnSafe与alloc和allocUnsafeSlow
Buffer.allocUnSafe与Buffer.alloc的区别在于，前者是从采用allocate的策略，尝试从buffer pool中申请内存，而buffer pool是不会进行默认值填充的，所以这种行为是不安全的。
Buffer.allocUnsafeSlow有两个大特点: 直接通过c++进行内存分配；不会进行旧值填充

--------------UTF-8下汉字一般占3字节即ff ff ff 字母占1个

--------------Buffer.byteLength(string[, encoding])
返回字符串的实际字节长度 console.log(Buffer.byteLength("我","utf-8")); //3

--------------Buffer.alloc(size[, fill[, encoding]])
--------------Buffer.allocUnsafe(size)
--------------Buffer.allocUnsafeSlow(size)
--------------Buffer.byteLength(string[, encoding])
--------------Buffer.compare(buf1, buf2) //比较 buf1 与 buf2，主要用于 Buffer 数组的排序。 相当于调用 buf1.compare(buf2)。arr.sort(Buffer.compare)
--------------Buffer.concat(list[, totalLength]) //Buffer.concat([buf1, buf2, buf3], totalLength);
--------------Buffer.from(arrayBuffer[, byteOffset[, length]])//创建 ArrayBuffer 的视图，但不会拷贝底层内存，当传入 TypedArray 的 .buffer 属性的引用时，新建的 Buffer 会与 TypedArray 共享同一内存。(即arrayBuffer)

				const arr = new Uint16Array(2);

				arr[0] = 5000;
				arr[1] = 4000;

				// 与 `arr` 共享内存。
				const buf = Buffer.from(arr.buffer);

				console.log(buf);
				// 打印: <Buffer 88 13 a0 0f>

				// 改变原先的 Uint16Array 也会改变 Buffer。
				arr[1] = 6000;

				console.log(buf);
				// 打印: <Buffer 88 13 70 17>

--------------Buffer.from(string[, encoding])
--------------Buffer.from(array)//使用八位字节数组 array 分配一个新的 Buffer。
--------------Buffer.from(buffer)//拷贝 buffer 的数据到新建的 Buffer。//创建一个包含 string 的新 Buffer。 encoding 参数指定 string 的字符编码。（默认utf-8）
--------------Buffer.from(object[, offsetOrEncoding[, length]])（object <Object> 支持 Symbol.toPrimitive 或 valueOf() 的对象。）
--------------Buffer.isBuffer(obj)
--------------Buffer.isEncoding(encoding)
--------------Buffer.poolSize//指定预分配的 Buffer 池的大小（以字节为单位）。 该值可以修改。
--------------buf.buffer//<ArrayBuffer> Buffer 底层的 ArrayBuffer 对象。
--------------buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])//对比 buf 与 target，并返回一个数值，表明 buf 在排序上是否排在 target 前面、或后面、或相同。
--------------buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
				// 创建两个 `Buffer`。
				const buf1 = Buffer.allocUnsafe(26);
				const buf2 = Buffer.allocUnsafe(26).fill('!');

				for (let i = 0; i < 26; i++) {
				  // 97 是 'a' 的十进制 ASCII 值。
				  buf1[i] = i + 97;
				}

				// 拷贝 `buf1` 中第 16 至 19 字节偏移量的数据到 `buf2` 第 8 字节偏移量开始。
				buf1.copy(buf2, 8, 16, 20);

				console.log(buf2.toString('ascii', 0, 25));
				// 打印: !!!!!!!!qrst!!!!!!!!!!!!!

--------------buf.equals(otherBuffer)//如果 buf 与 otherBuffer 具有完全相同的字节，则返回 true，否则返回 false。
--------------buf.fill(value[, offset[, end]][, encoding])
--------------buf.includes(value[, byteOffset][, encoding])
--------------buf.indexOf(value[, byteOffset][, encoding])
--------------buf.lastIndexOf(value[, byteOffset][, encoding])
--------------buf.length//返回内存中分配给 buf 的字节数。 不一定反映 buf 中可用数据的字节量。
--------------buf.readInt8(offset)//从 buf 中指定的 offset 读取一个有符号的 8 位整数值。
--------------buf.slice([start[, end]])//创建一个指向与原始 Buffer 同一内存的新 Buffer，但使用 start 和 end 进行了裁剪。
--------------buf.toJSON()//返回 buf 的 JSON 格式。 当字符串化 Buffer 时，JSON.stringify() 会调用该函数。
--------------buf.toString([encoding[, start[, end]]])//根据 encoding 指定的字符编码将 buf 解码成字符串。
--------------buf.write(string[, offset[, length]][, encoding])//据 encoding 指定的字符编码将 string 写入到 buf 中的 offset 位置。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分
