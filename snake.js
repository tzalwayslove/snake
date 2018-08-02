/**
 * Created by MSI-PC on 2018/4/25.
 */
function Snake(options) {
  options = options || {}

  this.width = options.width || 20
  this.height = options.height || 20
  this.headColor = options.headColor || 'red'
  this.bodyColor = options.bodyColor || 'blue'

  // 添加方向属性：
  this.direction = options.direction || 'right'

  // 核心：
  this.body = [
    { x: 2, y: 0 }, // 蛇头
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]
}

Snake.prototype.render = function (target) {
  // 思路：
  // 因为蛇由很多个关节，所以，我们需要为每一个关节分别创建一个DOM元素，并且渲染在页面中
  // 以此，来表示整条蛇

  // 1 遍历蛇body
  for (var i = 0; i < this.body.length; i++) {
    // 2 分别为每一节创建一个span元素
    var span = document.createElement('span')

    // 3 设置每个span的样式
    span.style.width = this.width + 'px'
    span.style.height = this.height + 'px'
    span.style.backgroundColor = i === 0 ? this.headColor : this.bodyColor

    // 设置位置
    span.style.position = 'absolute'
    span.style.top = this.body[i].y * this.height + 'px'
    span.style.left = this.body[i].x * this.width + 'px'

    // 4 将每个span追加到页面中
    target.appendChild(span)
  }
}

// 让蛇动起来
Snake.prototype.move = function (target) {
  // 思路：
  // 1 创建一个新的蛇节
  // 2 这个蛇节默认的位置与蛇头的位置相同
  var newNode = {
    x: this.body[0].x,
    y: this.body[0].y
  }

  // 3 根据移动的方向来决定如何修改 这个新节 的坐标
  switch (this.direction) {
    case 'right':
      newNode.x++
      break
    case 'left':
      newNode.x--
      break
    case 'up':
      newNode.y--
      break
    case 'down':
      newNode.y++
      break
  }

  // 4 将这个新节插入到body数组中
  this.body.unshift(newNode)

  // 5 将数组的最后一项移除
  this.body.pop()

  // 6 蛇动起来的思路：先删除原来的蛇对应的DOM对象，再根据最新的蛇节来渲染新的蛇

  // 删除原来的蛇对应的DOM对象
  var spans = document.querySelectorAll('span')
  for (var i = 0; i < spans.length; i++) {
    target.removeChild(spans[i])
  }

  // 调用 render方法重新渲染蛇对应的DOM对象
  this.render(target)
}