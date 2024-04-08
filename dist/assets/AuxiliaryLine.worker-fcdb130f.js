self.onmessage = (d) => {
  const { current: s, nodes: u } = d.data, { v1: f, v2: a, v3: o, h1: p, h2: r, h3: i } = m(s), e = [f, a, o], t = [p, r, i];
  var v = [];
  u.forEach((c) => {
    if (c.nodeID === s.nodeID)
      return;
    const n = m(c);
    e.find((h) => h === n.v1) && v.push({ num: n.v1, type: "v" }), e.find((h) => h === n.v2) && v.push({ num: n.v2, type: "v" }), e.find((h) => h === n.v3) && v.push({ num: n.v3, type: "v" }), t.find((h) => h === n.h1) && v.push({ num: n.h1, type: "h" }), t.find((h) => h === n.h2) && v.push({ num: n.h2, type: "h" }), t.find((h) => h === n.h3) && v.push({ num: n.h3, type: "h" });
  }), postMessage(v);
};
function m(d) {
  var s = 0, u = 0, f = 0, a = 0, o = 0, p = 0;
  const { x: r, y: i, width: e, height: t } = d;
  return s = r, u = r + e / 2, f = r + e, a = i, o = i + t / 2, p = i + t, { v1: s, v2: u, v3: f, h1: a, h2: o, h3: p };
}
