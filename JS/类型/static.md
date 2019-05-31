不能在类的实例上调用静态方法，而应该通过类本身调用

静态方法调用同一个类中的其他静态方法，可使用 this 关键字。

非静态方法中，不能直接使用 this 关键字来访问静态方法。而是要用类名来调用：CLASSNAME.STATIC_METHOD_NAME() ，或者用构造函数的属性来调用该方法： this.constructor.STATIC_METHOD_NAME().

