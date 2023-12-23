let canvasPadding = 5
var ctx

$(document).ready(()=>{
    var canvas = document.getElementById('draw_canvas');
    var width = window.innerWidth-canvasPadding;
    var height = window.innerHeight-canvasPadding;
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext('2d');

    var anchorPoint = {x: width/2, y: height/2-200}
    var anchorRot = 65;
    drawStar(ctx, anchorPoint.x, anchorPoint.y, 5, 40, 20, "black", "yellow");

    var colors = ['yellow', 'green', 'pink', 'blue', 'purple']
    var step = 50, lineLength = 80
    var stepRot = 2
    for (var i = 0; i < colors.length; i++){
        var color = colors[i];
        var lineStart = anchorPoint.y + step*(i+1);
        console.log(Math.cos(rad(anchorRot)))
        var curRot = anchorRot;
        for (var rot = anchorRot; rot < 180-anchorRot; rot+=stepRot){
            var startPoint = {x:anchorPoint.x-Math.cos(rad(rot))*step*(i+1),y:lineStart};
            var endPoint = {x:anchorPoint.x-Math.cos(rad(rot))*(step*(i+1)+lineLength), y:lineStart+Math.sin(rad(anchorRot))*lineLength}
            draw_line_with_anim(ctx,startPoint,endPoint,color)
        }
    }
    
    setTimeout(()=>{
    var colors = ['orange', 'blue', 'red', 'cyan', 'white']
    var step = 50, lineLength = 40
    var stepRot = 2
    for (var i = 0; i < colors.length; i++){
        var color = colors[i];
        var lineStart = anchorPoint.y+lineLength/2 + step*(i+1);
        console.log(Math.cos(rad(anchorRot)))
        var curRot = anchorRot;
        for (var rot = anchorRot; rot < 180-anchorRot; rot+=stepRot){
            var startPoint = {x:anchorPoint.x-Math.cos(rad(rot))*step*(i+1),y:lineStart};
            var endPoint = {x:anchorPoint.x-Math.cos(rad(rot))*(step*(i+1)+lineLength), y:lineStart+Math.sin(rad(anchorRot))*lineLength}
            draw_line_with_anim(ctx,startPoint,endPoint,color)
        }
    }}, 1000
    )
})

function draw_line_with_anim(context,startPoint,endPoint,colorStroke){
    context.beginPath();
    var t = 1;
    var dx = endPoint.x - startPoint.x;
    var dy = endPoint.y - startPoint.y;
    var points=[];
    var frames = 60;
    for (var i = 0; i < frames; i++){
        var point = {x:startPoint.x+dx*i/frames, y:startPoint.y+dy*i/frames};
        points.push(point);
    }
    const animate = ()=>{
        if(t<points.length-1){ 
            requestAnimationFrame(animate); 
        }
        ctx.beginPath();
        ctx.moveTo(points[t-1].x-1,points[t-1].y-1);
        ctx.lineTo(points[t].x,points[t].y);
        ctx.strokeStyle = colorStroke;
        ctx.stroke();
        // increment "t" to get the next waypoint
        t++;
    }
    animate()
}

function drawStar(context, cx, cy, spikes, outerRadius, innerRadius, colorStroke, colorFill) {
    var rot = (Math.PI / 2) * 3; // Bắt đầu từ góc trên cùng bên trái
    var x = cx;
    var y = cy;
    var step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(cx, cy - outerRadius); // Đặt bút về vị trí đầu tiên

    // Vẽ ngôi sao
    for (var i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y);
      rot += step;
    }

    context.lineTo(cx, cy - outerRadius);
    context.closePath();

    // Tô màu và vẽ đường viền
    context.lineWidth = 5;
    context.strokeStyle = colorStroke;
    context.stroke();
    context.fillStyle = colorFill;
    context.fill();
  }

function rad(degree){
    return degree*Math.PI/180;
}