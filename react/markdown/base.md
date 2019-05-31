出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
// Correct
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
如果你想在每次调用 setState 后获得正确的 state ，可以通过如下代码实现
handle() {
    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
        console.log(this.state)
    })
}
---------------------------------------事件处理
React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串
<button onClick={activateLasers}>
	Activate Lasers
</button>
在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined
this.activateLasers = this.activateLasers.bind(this)
or
回调中使用箭头函数(在大多数情况下，这没什么问题，但如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染。)
<button onClick={(e) => this.handleClick(e)}>
	Click me
</button>
or
如果觉得使用 bind 很麻烦，这里有两种方式可以解决。如果你正在使用实验性的 public class fields 语法，你可以使用 class fields 正确的绑定回调函数：

class LoggingButton extends React.Component {
  // 此语法确保 `handleClick` 内的 `this` 已被绑定。
  // 注意: 这是 *实验性* 语法。
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}

Create React App 默认启用此语法。
-------------------------------------向事件处理程序传递参数 
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。
