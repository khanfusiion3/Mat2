class Mat2 {
  constructor(a, b, c, d) {
    this.set(a, b, c, d);
  }
  set(a = 0, b, c, d) {
    if (!b) {
      if (typeof a === 'number') {
        const c = Math.cos(a);
        const s = Math.sin(a);
        this.m00 = c;
        this.m01 = -s;
        this.m10 = s;
        this.m11 = c;
      } else if (a.m00) {
        this.m00 = a.m00;
        this.m01 = a.m01;
        this.m10 = a.m10;
        this.m11 = a.m11;
      }
    } else if (a && b && c && d) {
      this.m00 = a;
      this.m01 = b;
      this.m10 = c;
      this.m11 = d;
    }
    return this;
  }
  absi() {
    return this.abs(this);
  }
  abs(out = new Mat2()) {
    out.m00 = Math.abs(this.m00);
    out.m01 = Math.abs(this.m01);
    out.m10 = Math.abs(this.m10);
    out.m11 = Math.abs(this.m11);
    return this;
  }
  getAxisX(out = new Vec2()) {
    out.x = this.m00;
    out.y = this.m10;
    return out;
  }
  getAxisY(out = new Vec2()) {
    out.x = this.m01;
    out.y = this.m11;
    return out;
  }
  transposei() {
    const t = this.b;
    this.b = this.c;
    this.c = t;
    return this;
  }
  transpose(out = new Mat2()) {
    out.m00 = this.m00;
    out.m01 = this.m10;
    out.m10 = this.m01;
    out.m11 = this.m11;
    return out;
  }
  muli(v) {
    if (v.x) {
      return this.mul(v.x, v.y, v);
    } else if (v.m00) {
      return this.set(
        this.m00 * v.m00 + this.m01 * v.m10,
        this.m00 * v.m01 + this.m01 * v.m11,
        this.m10 * v.m00 + this.m11 * v.m10,
        this.m10 * v.m01 + this.m11 * v.m11
      );
    }
  }
  mul(x, y, out) {
    if (typeof x.m00 !== 'number') {
      out = out || new Vec2();
      if (typeof x === 'number') {
        out.x = this.m00 * x + this.m01 * y;
        out.y = this.m10 * x + this.m11 * y;
      } else if (x.x) {
        out.x = this.m00 * x.x + this.m01 * x.y;
        out.y = this.m10 * x.x + this.m11 * x.y;
      }
      return out;
    } else {
      out = out || new Mat2();
      out.m00 = this.m00 * x.m00 + this.m01 * x.m10;
      out.m01 = this.m00 * x.m01 + this.m01 * x.m11;
      out.m10 = this.m10 * x.m00 + this.m11 * x.m10;
      out.m11 = this.m10 * x.m01 + this.m11 * x.m11;
      return out;
    }
  }
}
