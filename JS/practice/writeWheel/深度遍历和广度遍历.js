//  <div id='root'>
//         <span>123
//             <a href="#">
//                 sdsd
//             </a>
//             <div>sdsd<a>这是一个a标签</a></div>
//         </span>
//         <span>456
//             <p>这是一个p标签</p>
//         </span>
//     </div>

function deepTraversal(node) {
    var nodeList = [];
    if (node) {
        var stack = [];
        stack.push(node);
        while (stack.length != 0) {
            var item = stack.pop();
            nodeList.push(item);
            var children = item.children;
            for (var i = children.length - 1; i >= 0; i--)
                stack.push(children[i]);
        }
    }
    return nodeList;
}
var root = document.getElementById('root')
console.log(deepTraversal(root))

function wideTraversal(node) {
    var nodeList = [];
    if (node) {
        var stack = [];
        stack.push(node);
        while (stack.length != 0) {
            var item = stack.shift();
            nodeList.push(item);
            var children = item.children;
            for (var i = 0; i < children.length; i++)
                stack.push(children[i]);
        }
    }
    return nodeList;
}
var root = document.getElementById('root');
console.log(wideTraversal(root));