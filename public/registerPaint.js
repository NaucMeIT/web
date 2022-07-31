/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-loop-statement */
/* eslint-disable functional/no-let */
/* eslint-disable functional/no-class */
/* eslint-disable no-undef */
registerPaint(
  "polygon-border",
  class {
    static get inputProperties() {
      return ["--path", "--border"]
    }

    paint(ctx, size, properties) {
      const points = properties.get("--path").toString().split(",")
      const b = parseFloat(properties.get("--border").value)
      const w = size.width
      const h = size.height

      const cc = function (x, y) {
        let fx = 0
        let fy = 0
        if (x?.indexOf("calc") > -1) {
          let tmp = x.replace("calc(", "").replace(")", "")
          if (tmp?.indexOf("+") > -1) {
            tmp = tmp.split("+")
            fx = (parseFloat(tmp[0]) / 100) * w + parseFloat(tmp[1])
          } else {
            tmp = tmp.split("-")
            fx = (parseFloat(tmp[0]) / 100) * w - parseFloat(tmp[1])
          }
        } else if (x?.indexOf("%") > -1) {
          fx = (parseFloat(x) / 100) * w
        } else if (x?.indexOf("px") > -1) {
          fx = parseFloat(x)
        }

        if (y?.indexOf("calc") > -1) {
          let tmp = y.replace("calc(", "").replace(")", "")
          if (tmp?.indexOf("+") > -1) {
            tmp = tmp.split("+")
            fy = (parseFloat(tmp[0]) / 100) * h + parseFloat(tmp[1])
          } else {
            tmp = tmp.split("-")
            fy = (parseFloat(tmp[0]) / 100) * h - parseFloat(tmp[1])
          }
        } else if (y?.indexOf("%") > -1) {
          fy = (parseFloat(y) / 100) * h
        } else if (y?.indexOf("px") > -1) {
          fy = parseFloat(y)
        }
        return [fx, fy]
      }

      let p = points[0].trim().split(/(?!\(.*)\s(?![^(]*?\))/g)
      p = cc(p[0], p[1])
      ctx.beginPath()
      ctx.moveTo(p[0], p[1])

      for (var i = 1; i < points.length; i++) {
        p = points[i].trim().split(/(?!\(.*)\s(?![^(]*?\))/g)
        p = cc(p[0], p[1])
        ctx.lineTo(p[0], p[1])
      }
      ctx.closePath()
      ctx.lineWidth = 2 * b
      ctx.strokeStyle = "#000"
      ctx.stroke()
    }
  },
)
