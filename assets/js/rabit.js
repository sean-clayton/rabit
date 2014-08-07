var hljs = new function() {
  function j(v) {
    return v.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;")
  }

  function t(v) {
    return v.nodeName.toLowerCase()
  }

  function h(w, x) {
    var v = w && w.exec(x);
    return v && v.index == 0
  }

  function r(w) {
    var v = (w.className + " " + (w.parentNode ? w.parentNode.className : "")).split(/\s+/);
    v = v.map(function(x) {
      return x.replace(/^lang(uage)?-/, "")
    });
    return v.filter(function(x) {
      return i(x) || x == "no-highlight"
    })[0]
  }

  function o(x, y) {
    var v = {};
    for (var w in x) {
      v[w] = x[w]
    }
    if (y) {
      for (var w in y) {
        v[w] = y[w]
      }
    }
    return v
  }

  function u(x) {
    var v = [];
    (function w(y, z) {
      for (var A = y.firstChild; A; A = A.nextSibling) {
        if (A.nodeType == 3) {
          z += A.nodeValue.length
        } else {
          if (t(A) == "br") {
            z += 1
          } else {
            if (A.nodeType == 1) {
              v.push({
                event: "start",
                offset: z,
                node: A
              });
              z = w(A, z);
              v.push({
                event: "stop",
                offset: z,
                node: A
              })
            }
          }
        }
      }
      return z
    })(x, 0);
    return v
  }

  function q(w, y, C) {
    var x = 0;
    var F = "";
    var z = [];

    function B() {
      if (!w.length || !y.length) {
        return w.length ? w : y
      }
      if (w[0].offset != y[0].offset) {
        return (w[0].offset < y[0].offset) ? w : y
      }
      return y[0].event == "start" ? w : y
    }

    function A(H) {
      function G(I) {
        return " " + I.nodeName + '="' + j(I.value) + '"'
      }
      F += "<" + t(H) + Array.prototype.map.call(H.attributes, G).join("") + ">"
    }

    function E(G) {
      F += "</" + t(G) + ">"
    }

    function v(G) {
      (G.event == "start" ? A : E)(G.node)
    }
    while (w.length || y.length) {
      var D = B();
      F += j(C.substr(x, D[0].offset - x));
      x = D[0].offset;
      if (D == w) {
        z.reverse().forEach(E);
        do {
          v(D.splice(0, 1)[0]);
          D = B()
        } while (D == w && D.length && D[0].offset == x);
        z.reverse().forEach(A)
      } else {
        if (D[0].event == "start") {
          z.push(D[0].node)
        } else {
          z.pop()
        }
        v(D.splice(0, 1)[0])
      }
    }
    return F + j(C.substr(x))
  }

  function m(y) {
    function v(z) {
      return (z && z.source) || z
    }

    function w(A, z) {
      return RegExp(v(A), "m" + (y.cI ? "i" : "") + (z ? "g" : ""))
    }

    function x(D, C) {
      if (D.compiled) {
        return
      }
      D.compiled = true;
      D.k = D.k || D.bK;
      if (D.k) {
        var z = {};
        var E = function(G, F) {
          if (y.cI) {
            F = F.toLowerCase()
          }
          F.split(" ").forEach(function(H) {
            var I = H.split("|");
            z[I[0]] = [G, I[1] ? Number(I[1]) : 1]
          })
        };
        if (typeof D.k == "string") {
          E("keyword", D.k)
        } else {
          Object.keys(D.k).forEach(function(F) {
            E(F, D.k[F])
          })
        }
        D.k = z
      }
      D.lR = w(D.l || /\b[A-Za-z0-9_]+\b/, true);
      if (C) {
        if (D.bK) {
          D.b = "\\b(" + D.bK.split(" ").join("|") + ")\\b"
        }
        if (!D.b) {
          D.b = /\B|\b/
        }
        D.bR = w(D.b);
        if (!D.e && !D.eW) {
          D.e = /\B|\b/
        }
        if (D.e) {
          D.eR = w(D.e)
        }
        D.tE = v(D.e) || "";
        if (D.eW && C.tE) {
          D.tE += (D.e ? "|" : "") + C.tE
        }
      }
      if (D.i) {
        D.iR = w(D.i)
      }
      if (D.r === undefined) {
        D.r = 1
      }
      if (!D.c) {
        D.c = []
      }
      var B = [];
      D.c.forEach(function(F) {
        if (F.v) {
          F.v.forEach(function(G) {
            B.push(o(F, G))
          })
        } else {
          B.push(F == "self" ? D : F)
        }
      });
      D.c = B;
      D.c.forEach(function(F) {
        x(F, D)
      });
      if (D.starts) {
        x(D.starts, C)
      }
      var A = D.c.map(function(F) {
        return F.bK ? "\\.?(" + F.b + ")\\.?" : F.b
      }).concat([D.tE, D.i]).map(v).filter(Boolean);
      D.t = A.length ? w(A.join("|"), true) : {
        exec: function(F) {
          return null
        }
      };
      D.continuation = {}
    }
    x(y)
  }

  function c(S, L, J, R) {
    function v(U, V) {
      for (var T = 0; T < V.c.length; T++) {
        if (h(V.c[T].bR, U)) {
          return V.c[T]
        }
      }
    }

    function z(U, T) {
      if (h(U.eR, T)) {
        return U
      }
      if (U.eW) {
        return z(U.parent, T)
      }
    }

    function A(T, U) {
      return !J && h(U.iR, T)
    }

    function E(V, T) {
      var U = M.cI ? T[0].toLowerCase() : T[0];
      return V.k.hasOwnProperty(U) && V.k[U]
    }

    function w(Z, X, W, V) {
      var T = V ? "" : b.classPrefix,
        U = '<span class="' + T,
        Y = W ? "" : "</span>";
      U += Z + '">';
      return U + X + Y
    }

    function N() {
      if (!I.k) {
        return j(C)
      }
      var T = "";
      var W = 0;
      I.lR.lastIndex = 0;
      var U = I.lR.exec(C);
      while (U) {
        T += j(C.substr(W, U.index - W));
        var V = E(I, U);
        if (V) {
          H += V[1];
          T += w(V[0], j(U[0]))
        } else {
          T += j(U[0])
        }
        W = I.lR.lastIndex;
        U = I.lR.exec(C)
      }
      return T + j(C.substr(W))
    }

    function F() {
      if (I.sL && !f[I.sL]) {
        return j(C)
      }
      var T = I.sL ? c(I.sL, C, true, I.continuation.top) : e(C);
      if (I.r > 0) {
        H += T.r
      }
      if (I.subLanguageMode == "continuous") {
        I.continuation.top = T.top
      }
      return w(T.language, T.value, false, true)
    }

    function Q() {
      return I.sL !== undefined ? F() : N()
    }

    function P(V, U) {
      var T = V.cN ? w(V.cN, "", true) : "";
      if (V.rB) {
        D += T;
        C = ""
      } else {
        if (V.eB) {
          D += j(U) + T;
          C = ""
        } else {
          D += T;
          C = U
        }
      }
      I = Object.create(V, {
        parent: {
          value: I
        }
      })
    }

    function G(T, X) {
      C += T;
      if (X === undefined) {
        D += Q();
        return 0
      }
      var V = v(X, I);
      if (V) {
        D += Q();
        P(V, X);
        return V.rB ? 0 : X.length
      }
      var W = z(I, X);
      if (W) {
        var U = I;
        if (!(U.rE || U.eE)) {
          C += X
        }
        D += Q();
        do {
          if (I.cN) {
            D += "</span>"
          }
          H += I.r;
          I = I.parent
        } while (I != W.parent);
        if (U.eE) {
          D += j(X)
        }
        C = "";
        if (W.starts) {
          P(W.starts, "")
        }
        return U.rE ? 0 : X.length
      }
      if (A(X, I)) {
        throw new Error('Illegal lexeme "' + X + '" for mode "' + (I.cN || "<unnamed>") + '"')
      }
      C += X;
      return X.length || 1
    }
    var M = i(S);
    if (!M) {
      throw new Error('Unknown language: "' + S + '"')
    }
    m(M);
    var I = R || M;
    var D = "";
    for (var K = I; K != M; K = K.parent) {
      if (K.cN) {
        D += w(K.cN, D, true)
      }
    }
    var C = "";
    var H = 0;
    try {
      var B, y, x = 0;
      while (true) {
        I.t.lastIndex = x;
        B = I.t.exec(L);
        if (!B) {
          break
        }
        y = G(L.substr(x, B.index - x), B[0]);
        x = B.index + y
      }
      G(L.substr(x));
      for (var K = I; K.parent; K = K.parent) {
        if (K.cN) {
          D += "</span>"
        }
      }
      return {
        r: H,
        value: D,
        language: S,
        top: I
      }
    } catch (O) {
      if (O.message.indexOf("Illegal") != -1) {
        return {
          r: 0,
          value: j(L)
        }
      } else {
        throw O
      }
    }
  }

  function e(y, x) {
    x = x || b.languages || Object.keys(f);
    var v = {
      r: 0,
      value: j(y)
    };
    var w = v;
    x.forEach(function(z) {
      if (!i(z)) {
        return
      }
      var A = c(z, y, false);
      A.language = z;
      if (A.r > w.r) {
        w = A
      }
      if (A.r > v.r) {
        w = v;
        v = A
      }
    });
    if (w.language) {
      v.second_best = w
    }
    return v
  }

  function g(v) {
    if (b.tabReplace) {
      v = v.replace(/^((<[^>]+>|\t)+)/gm, function(w, z, y, x) {
        return z.replace(/\t/g, b.tabReplace)
      })
    }
    if (b.useBR) {
      v = v.replace(/\n/g, "<br>")
    }
    return v
  }

  function p(z) {
    var y = b.useBR ? z.innerHTML.replace(/\n/g, "").replace(/<br>|<br [^>]*>/g, "\n").replace(/<[^>]*>/g, "") : z.textContent;
    var A = r(z);
    if (A == "no-highlight") {
      return
    }
    var v = A ? c(A, y, true) : e(y);
    var w = u(z);
    if (w.length) {
      var x = document.createElementNS("http://www.w3.org/1999/xhtml", "pre");
      x.innerHTML = v.value;
      v.value = q(w, u(x), y)
    }
    v.value = g(v.value);
    z.innerHTML = v.value;
    z.className += " hljs " + (!A && v.language || "");
    z.result = {
      language: v.language,
      re: v.r
    };
    if (v.second_best) {
      z.second_best = {
        language: v.second_best.language,
        re: v.second_best.r
      }
    }
  }
  var b = {
    classPrefix: "hljs-",
    tabReplace: null,
    useBR: false,
    languages: undefined
  };

  function s(v) {
    b = o(b, v)
  }

  function l() {
    if (l.called) {
      return
    }
    l.called = true;
    var v = document.querySelectorAll("pre code");
    Array.prototype.forEach.call(v, p)
  }

  function a() {
    addEventListener("DOMContentLoaded", l, false);
    addEventListener("load", l, false)
  }
  var f = {};
  var n = {};

  function d(v, x) {
    var w = f[v] = x(this);
    if (w.aliases) {
      w.aliases.forEach(function(y) {
        n[y] = v
      })
    }
  }

  function k() {
    return Object.keys(f)
  }

  function i(v) {
    return f[v] || f[n[v]]
  }
  this.highlight = c;
  this.highlightAuto = e;
  this.fixMarkup = g;
  this.highlightBlock = p;
  this.configure = s;
  this.initHighlighting = l;
  this.initHighlightingOnLoad = a;
  this.registerLanguage = d;
  this.listLanguages = k;
  this.getLanguage = i;
  this.inherit = o;
  this.IR = "[a-zA-Z][a-zA-Z0-9_]*";
  this.UIR = "[a-zA-Z_][a-zA-Z0-9_]*";
  this.NR = "\\b\\d+(\\.\\d+)?";
  this.CNR = "(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)";
  this.BNR = "\\b(0b[01]+)";
  this.RSR = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~";
  this.BE = {
    b: "\\\\[\\s\\S]",
    r: 0
  };
  this.ASM = {
    cN: "string",
    b: "'",
    e: "'",
    i: "\\n",
    c: [this.BE]
  };
  this.QSM = {
    cN: "string",
    b: '"',
    e: '"',
    i: "\\n",
    c: [this.BE]
  };
  this.PWM = {
    b: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/
  };
  this.CLCM = {
    cN: "comment",
    b: "//",
    e: "$",
    c: [this.PWM]
  };
  this.CBCM = {
    cN: "comment",
    b: "/\\*",
    e: "\\*/",
    c: [this.PWM]
  };
  this.HCM = {
    cN: "comment",
    b: "#",
    e: "$",
    c: [this.PWM]
  };
  this.NM = {
    cN: "number",
    b: this.NR,
    r: 0
  };
  this.CNM = {
    cN: "number",
    b: this.CNR,
    r: 0
  };
  this.BNM = {
    cN: "number",
    b: this.BNR,
    r: 0
  };
  this.CSSNM = {
    cN: "number",
    b: this.NR + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    r: 0
  };
  this.RM = {
    cN: "regexp",
    b: /\//,
    e: /\/[gim]*/,
    i: /\n/,
    c: [this.BE, {
      b: /\[/,
      e: /\]/,
      r: 0,
      c: [this.BE]
    }]
  };
  this.TM = {
    cN: "title",
    b: this.IR,
    r: 0
  };
  this.UTM = {
    cN: "title",
    b: this.UIR,
    r: 0
  }
}();
hljs.registerLanguage("bash", function(b) {
  var a = {
    cN: "variable",
    v: [{
      b: /\$[\w\d#@][\w\d_]*/
    }, {
      b: /\$\{(.*?)\}/
    }]
  };
  var d = {
    cN: "string",
    b: /"/,
    e: /"/,
    c: [b.BE, a, {
      cN: "variable",
      b: /\$\(/,
      e: /\)/,
      c: [b.BE]
    }]
  };
  var c = {
    cN: "string",
    b: /'/,
    e: /'/
  };
  return {
    aliases: ["sh", "zsh"],
    l: /-?[a-z\.]+/,
    k: {
      keyword: "if then else elif fi for break continue while in do done exit return set declare case esac export exec",
      literal: "true false",
      built_in: "printf echo read cd pwd pushd popd dirs let eval unset typeset readonly getopts source shopt caller type hash bind help sudo",
      operator: "-ne -eq -lt -gt -f -d -e -s -l -a"
    },
    c: [{
        cN: "shebang",
        b: /^#![^\n]+sh\s*$/,
        r: 10
      }, {
        cN: "function",
        b: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
        rB: true,
        c: [b.inherit(b.TM, {
          b: /\w[\w\d_]*/
        })],
        r: 0
      },
      b.HCM, b.NM, d, c, a
    ]
  }
});
hljs.registerLanguage("cs", function(b) {
  var a = "abstract as base bool break byte case catch char checked const continue decimal default delegate do double else enum event explicit extern false finally fixed float for foreach goto if implicit in int interface internal is lock long new null object operator out override params private protected public readonly ref return sbyte sealed short sizeof stackalloc static string struct switch this throw true try typeof uint ulong unchecked unsafe ushort using virtual volatile void while async await ascending descending from get group into join let orderby partial select set value var where yield";
  return {
    aliases: ["csharp"],
    k: a,
    i: /::/,
    c: [{
        cN: "comment",
        b: "///",
        e: "$",
        rB: true,
        c: [{
          cN: "xmlDocTag",
          v: [{
            b: "///",
            r: 0
          }, {
            b: "<!--|-->"
          }, {
            b: "</?",
            e: ">"
          }]
        }]
      },
      b.CLCM, b.CBCM, {
        cN: "preprocessor",
        b: "#",
        e: "$",
        k: "if else elif endif define undef warning error line region endregion pragma checksum"
      }, {
        cN: "string",
        b: '@"',
        e: '"',
        c: [{
          b: '""'
        }]
      },
      b.ASM, b.QSM, b.CNM, {
        bK: "protected public private internal",
        e: /[{;=]/,
        k: a,
        c: [{
          bK: "class namespace interface",
          starts: {
            c: [b.TM]
          }
        }, {
          b: b.IR + "\\s*\\(",
          rB: true,
          c: [b.TM]
        }]
      }
    ]
  }
});
hljs.registerLanguage("diff", function(a) {
  return {
    aliases: ["patch"],
    c: [{
      cN: "chunk",
      r: 10,
      v: [{
        b: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/
      }, {
        b: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
      }, {
        b: /^\-\-\- +\d+,\d+ +\-\-\-\-$/
      }]
    }, {
      cN: "header",
      v: [{
        b: /Index: /,
        e: /$/
      }, {
        b: /=====/,
        e: /=====$/
      }, {
        b: /^\-\-\-/,
        e: /$/
      }, {
        b: /^\*{3} /,
        e: /$/
      }, {
        b: /^\+\+\+/,
        e: /$/
      }, {
        b: /\*{5}/,
        e: /\*{5}$/
      }]
    }, {
      cN: "addition",
      b: "^\\+",
      e: "$"
    }, {
      cN: "deletion",
      b: "^\\-",
      e: "$"
    }, {
      cN: "change",
      b: "^\\!",
      e: "$"
    }]
  }
});
hljs.registerLanguage("ruby", function(f) {
  var j = "[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?";
  var i = "and false then defined module in return redo if BEGIN retry end for true self when next until do begin unless END rescue nil else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor";
  var b = {
    cN: "yardoctag",
    b: "@[A-Za-z]+"
  };
  var c = {
    cN: "value",
    b: "#<",
    e: ">"
  };
  var k = {
    cN: "comment",
    v: [{
      b: "#",
      e: "$",
      c: [b]
    }, {
      b: "^\\=begin",
      e: "^\\=end",
      c: [b],
      r: 10
    }, {
      b: "^__END__",
      e: "\\n$"
    }]
  };
  var d = {
    cN: "subst",
    b: "#\\{",
    e: "}",
    k: i
  };
  var e = {
    cN: "string",
    c: [f.BE, d],
    v: [{
      b: /'/,
      e: /'/
    }, {
      b: /"/,
      e: /"/
    }, {
      b: "%[qw]?\\(",
      e: "\\)"
    }, {
      b: "%[qw]?\\[",
      e: "\\]"
    }, {
      b: "%[qw]?{",
      e: "}"
    }, {
      b: "%[qw]?<",
      e: ">"
    }, {
      b: "%[qw]?/",
      e: "/"
    }, {
      b: "%[qw]?%",
      e: "%"
    }, {
      b: "%[qw]?-",
      e: "-"
    }, {
      b: "%[qw]?\\|",
      e: "\\|"
    }, {
      b: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/
    }]
  };
  var a = {
    cN: "params",
    b: "\\(",
    e: "\\)",
    k: i
  };
  var h = [e, c, k, {
    cN: "class",
    bK: "class module",
    e: "$|;",
    i: /=/,
    c: [f.inherit(f.TM, {
        b: "[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?"
      }), {
        cN: "inheritance",
        b: "<\\s*",
        c: [{
          cN: "parent",
          b: "(" + f.IR + "::)?" + f.IR
        }]
      },
      k
    ]
  }, {
    cN: "function",
    bK: "def",
    e: " |$|;",
    r: 0,
    c: [f.inherit(f.TM, {
      b: j
    }), a, k]
  }, {
    cN: "constant",
    b: "(::)?(\\b[A-Z]\\w*(::)?)+",
    r: 0
  }, {
    cN: "symbol",
    b: ":",
    c: [e, {
      b: j
    }],
    r: 0
  }, {
    cN: "symbol",
    b: f.UIR + "(\\!|\\?)?:",
    r: 0
  }, {
    cN: "number",
    b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
    r: 0
  }, {
    cN: "variable",
    b: "(\\$\\W)|((\\$|\\@\\@?)(\\w+))"
  }, {
    b: "(" + f.RSR + ")\\s*",
    c: [c, k, {
      cN: "regexp",
      c: [f.BE, d],
      i: /\n/,
      v: [{
        b: "/",
        e: "/[a-z]*"
      }, {
        b: "%r{",
        e: "}[a-z]*"
      }, {
        b: "%r\\(",
        e: "\\)[a-z]*"
      }, {
        b: "%r!",
        e: "![a-z]*"
      }, {
        b: "%r\\[",
        e: "\\][a-z]*"
      }]
    }],
    r: 0
  }];
  d.c = h;
  a.c = h;
  var g = [{
    r: 1,
    cN: "output",
    b: "^\\s*=> ",
    e: "$",
    rB: true,
    c: [{
      cN: "status",
      b: "^\\s*=>"
    }, {
      b: " ",
      e: "$",
      c: h
    }]
  }, {
    r: 1,
    cN: "input",
    b: "^[^ ][^=>]*>+ ",
    e: "$",
    rB: true,
    c: [{
      cN: "prompt",
      b: "^[^ ][^=>]*>+"
    }, {
      b: " ",
      e: "$",
      c: h
    }]
  }];
  return {
    aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
    k: i,
    c: g.concat(h)
  }
});
hljs.registerLanguage("haml", function(a) {
  return {
    cI: true,
    c: [{
      cN: "doctype",
      b: "^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$",
      r: 10
    }, {
      cN: "comment",
      b: "^\\s*(!=#|=#|-#|/).*$",
      r: 0
    }, {
      b: "^\\s*(-|=|!=)(?!#)",
      starts: {
        e: "\\n",
        sL: "ruby"
      }
    }, {
      cN: "tag",
      b: "^\\s*%",
      c: [{
        cN: "title",
        b: "\\w+"
      }, {
        cN: "value",
        b: "[#\\.]\\w+"
      }, {
        b: "{\\s*",
        e: "\\s*}",
        eE: true,
        c: [{
          b: ":\\w+\\s*=>",
          e: ",\\s+",
          rB: true,
          eW: true,
          c: [{
            cN: "symbol",
            b: ":\\w+"
          }, {
            cN: "string",
            b: '"',
            e: '"'
          }, {
            cN: "string",
            b: "'",
            e: "'"
          }, {
            b: "\\w+",
            r: 0
          }]
        }]
      }, {
        b: "\\(\\s*",
        e: "\\s*\\)",
        eE: true,
        c: [{
          b: "\\w+\\s*=",
          e: "\\s+",
          rB: true,
          eW: true,
          c: [{
            cN: "attribute",
            b: "\\w+",
            r: 0
          }, {
            cN: "string",
            b: '"',
            e: '"'
          }, {
            cN: "string",
            b: "'",
            e: "'"
          }, {
            b: "\\w+",
            r: 0
          }]
        }]
      }]
    }, {
      cN: "bullet",
      b: "^\\s*[=~]\\s*",
      r: 0
    }, {
      b: "#{",
      starts: {
        e: "}",
        sL: "ruby"
      }
    }]
  }
});
hljs.registerLanguage("javascript", function(a) {
  return {
    aliases: ["js"],
    k: {
      keyword: "in if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const class",
      literal: "true false null undefined NaN Infinity",
      built_in: "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document"
    },
    c: [{
        cN: "pi",
        b: /^\s*('|")use strict('|")/,
        r: 10
      },
      a.ASM, a.QSM, a.CLCM, a.CBCM, a.CNM, {
        b: "(" + a.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [a.CLCM, a.CBCM, a.RM, {
          b: /</,
          e: />;/,
          r: 0,
          sL: "xml"
        }],
        r: 0
      }, {
        cN: "function",
        bK: "function",
        e: /\{/,
        eE: true,
        c: [a.inherit(a.TM, {
          b: /[A-Za-z$_][0-9A-Za-z$_]*/
        }), {
          cN: "params",
          b: /\(/,
          e: /\)/,
          c: [a.CLCM, a.CBCM],
          i: /["'\(]/
        }],
        i: /\[|%/
      }, {
        b: /\$[(.]/
      }, {
        b: "\\." + a.IR,
        r: 0
      }
    ]
  }
});
hljs.registerLanguage("xml", function(a) {
  var c = "[A-Za-z0-9\\._:-]+";
  var d = {
    b: /<\?(php)?(?!\w)/,
    e: /\?>/,
    sL: "php",
    subLanguageMode: "continuous"
  };
  var b = {
    eW: true,
    i: /</,
    r: 0,
    c: [d, {
      cN: "attribute",
      b: c,
      r: 0
    }, {
      b: "=",
      r: 0,
      c: [{
        cN: "value",
        v: [{
          b: /"/,
          e: /"/
        }, {
          b: /'/,
          e: /'/
        }, {
          b: /[^\s\/>]+/
        }]
      }]
    }]
  };
  return {
    aliases: ["html", "xhtml", "rss", "atom", "xsl", "plist"],
    cI: true,
    c: [{
        cN: "doctype",
        b: "<!DOCTYPE",
        e: ">",
        r: 10,
        c: [{
          b: "\\[",
          e: "\\]"
        }]
      }, {
        cN: "comment",
        b: "<!--",
        e: "-->",
        r: 10
      }, {
        cN: "cdata",
        b: "<\\!\\[CDATA\\[",
        e: "\\]\\]>",
        r: 10
      }, {
        cN: "tag",
        b: "<style(?=\\s|>|$)",
        e: ">",
        k: {
          title: "style"
        },
        c: [b],
        starts: {
          e: "</style>",
          rE: true,
          sL: "css"
        }
      }, {
        cN: "tag",
        b: "<script(?=\\s|>|$)",
        e: ">",
        k: {
          title: "script"
        },
        c: [b],
        starts: {
          e: "<\/script>",
          rE: true,
          sL: "javascript"
        }
      }, {
        b: "<%",
        e: "%>",
        sL: "vbscript"
      },
      d, {
        cN: "pi",
        b: /<\?\w+/,
        e: /\?>/,
        r: 10
      }, {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{
            cN: "title",
            b: "[^ /><]+",
            r: 0
          },
          b
        ]
      }
    ]
  }
});
hljs.registerLanguage("markdown", function(a) {
  return {
    aliases: ["md", "mkdown", "mkd"],
    c: [{
      cN: "header",
      v: [{
        b: "^#{1,6}",
        e: "$"
      }, {
        b: "^.+?\\n[=-]{2,}$"
      }]
    }, {
      b: "<",
      e: ">",
      sL: "xml",
      r: 0
    }, {
      cN: "bullet",
      b: "^([*+-]|(\\d+\\.))\\s+"
    }, {
      cN: "strong",
      b: "[*_]{2}.+?[*_]{2}"
    }, {
      cN: "emphasis",
      v: [{
        b: "\\*.+?\\*"
      }, {
        b: "_.+?_",
        r: 0
      }]
    }, {
      cN: "blockquote",
      b: "^>\\s+",
      e: "$"
    }, {
      cN: "code",
      v: [{
        b: "`.+?`"
      }, {
        b: "^( {4}|\t)",
        e: "$",
        r: 0
      }]
    }, {
      cN: "horizontal_rule",
      b: "^[-\\*]{3,}",
      e: "$"
    }, {
      b: "\\[.+?\\][\\(\\[].+?[\\)\\]]",
      rB: true,
      c: [{
        cN: "link_label",
        b: "\\[",
        e: "\\]",
        eB: true,
        rE: true,
        r: 0
      }, {
        cN: "link_url",
        b: "\\]\\(",
        e: "\\)",
        eB: true,
        eE: true
      }, {
        cN: "link_reference",
        b: "\\]\\[",
        e: "\\]",
        eB: true,
        eE: true
      }],
      r: 10
    }, {
      b: "^\\[.+\\]:",
      e: "$",
      rB: true,
      c: [{
        cN: "link_reference",
        b: "\\[",
        e: "\\]",
        eB: true,
        eE: true
      }, {
        cN: "link_url",
        b: "\\s",
        e: "$"
      }]
    }]
  }
});
hljs.registerLanguage("css", function(a) {
  var b = "[a-zA-Z-][a-zA-Z0-9_-]*";
  var c = {
    cN: "function",
    b: b + "\\(",
    rB: true,
    eE: true,
    e: "\\("
  };
  return {
    cI: true,
    i: "[=/|']",
    c: [a.CBCM, {
      cN: "id",
      b: "\\#[A-Za-z0-9_-]+"
    }, {
      cN: "class",
      b: "\\.[A-Za-z0-9_-]+",
      r: 0
    }, {
      cN: "attr_selector",
      b: "\\[",
      e: "\\]",
      i: "$"
    }, {
      cN: "pseudo",
      b: ":(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\\"\\']+"
    }, {
      cN: "at_rule",
      b: "@(font-face|page)",
      l: "[a-z-]+",
      k: "font-face page"
    }, {
      cN: "at_rule",
      b: "@",
      e: "[{;]",
      c: [{
        cN: "keyword",
        b: /\S+/
      }, {
        b: /\s/,
        eW: true,
        eE: true,
        r: 0,
        c: [c, a.ASM, a.QSM, a.CSSNM]
      }]
    }, {
      cN: "tag",
      b: b,
      r: 0
    }, {
      cN: "rules",
      b: "{",
      e: "}",
      i: "[^\\s]",
      r: 0,
      c: [a.CBCM, {
        cN: "rule",
        b: "[^\\s]",
        rB: true,
        e: ";",
        eW: true,
        c: [{
          cN: "attribute",
          b: "[A-Z\\_\\.\\-]+",
          e: ":",
          eE: true,
          i: "[^\\s]",
          starts: {
            cN: "value",
            eW: true,
            eE: true,
            c: [c, a.CSSNM, a.QSM, a.ASM, a.CBCM, {
              cN: "hexcolor",
              b: "#[0-9A-Fa-f]+"
            }, {
              cN: "important",
              b: "!important"
            }]
          }
        }]
      }]
    }]
  }
});
hljs.registerLanguage("http", function(a) {
  return {
    i: "\\S",
    c: [{
      cN: "status",
      b: "^HTTP/[0-9\\.]+",
      e: "$",
      c: [{
        cN: "number",
        b: "\\b\\d{3}\\b"
      }]
    }, {
      cN: "request",
      b: "^[A-Z]+ (.*?) HTTP/[0-9\\.]+$",
      rB: true,
      e: "$",
      c: [{
        cN: "string",
        b: " ",
        e: " ",
        eB: true,
        eE: true
      }]
    }, {
      cN: "attribute",
      b: "^\\w",
      e: ": ",
      eE: true,
      i: "\\n|\\s|=",
      starts: {
        cN: "string",
        e: "$"
      }
    }, {
      b: "\\n\\n",
      starts: {
        sL: "",
        eW: true
      }
    }]
  }
});
hljs.registerLanguage("handlebars", function(b) {
  var a = "each in with if else unless bindattr action collection debugger log outlet template unbound view yield";
  return {
    aliases: ["hbs", "html.hbs", "html.handlebars"],
    cI: true,
    sL: "xml",
    subLanguageMode: "continuous",
    c: [{
      cN: "expression",
      b: "{{",
      e: "}}",
      c: [{
        cN: "begin-block",
        b: "#[a-zA-Z- .]+",
        k: a
      }, {
        cN: "string",
        b: '"',
        e: '"'
      }, {
        cN: "end-block",
        b: "\\/[a-zA-Z- .]+",
        k: a
      }, {
        cN: "variable",
        b: "[a-zA-Z-.]+",
        k: a
      }]
    }]
  }
});
hljs.registerLanguage("perl", function(c) {
  var d = "getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qqfileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent shutdown dump chomp connect getsockname die socketpair close flock exists index shmgetsub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedirioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when";
  var f = {
    cN: "subst",
    b: "[$@]\\{",
    e: "\\}",
    k: d
  };
  var g = {
    b: "->{",
    e: "}"
  };
  var a = {
    cN: "variable",
    v: [{
      b: /\$\d/
    }, {
      b: /[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/
    }, {
      b: /[\$\%\@][^\s\w{]/,
      r: 0
    }]
  };
  var e = {
    cN: "comment",
    b: "^(__END__|__DATA__)",
    e: "\\n$",
    r: 5
  };
  var h = [c.BE, f, a];
  var b = [a, c.HCM, e, {
      cN: "comment",
      b: "^\\=\\w",
      e: "\\=cut",
      eW: true
    },
    g, {
      cN: "string",
      c: h,
      v: [{
        b: "q[qwxr]?\\s*\\(",
        e: "\\)",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\[",
        e: "\\]",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\{",
        e: "\\}",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\|",
        e: "\\|",
        r: 5
      }, {
        b: "q[qwxr]?\\s*\\<",
        e: "\\>",
        r: 5
      }, {
        b: "qw\\s+q",
        e: "q",
        r: 5
      }, {
        b: "'",
        e: "'",
        c: [c.BE]
      }, {
        b: '"',
        e: '"'
      }, {
        b: "`",
        e: "`",
        c: [c.BE]
      }, {
        b: "{\\w+}",
        c: [],
        r: 0
      }, {
        b: "-?\\w+\\s*\\=\\>",
        c: [],
        r: 0
      }]
    }, {
      cN: "number",
      b: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
      r: 0
    }, {
      b: "(\\/\\/|" + c.RSR + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
      k: "split return print reverse grep",
      r: 0,
      c: [c.HCM, e, {
        cN: "regexp",
        b: "(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*",
        r: 10
      }, {
        cN: "regexp",
        b: "(m|qr)?/",
        e: "/[a-z]*",
        c: [c.BE],
        r: 0
      }]
    }, {
      cN: "sub",
      bK: "sub",
      e: "(\\s*\\(.*?\\))?[;{]",
      r: 5
    }, {
      cN: "operator",
      b: "-\\w\\b",
      r: 0
    }
  ];
  f.c = b;
  g.c = b;
  return {
    aliases: ["pl"],
    k: d,
    c: b
  }
});
hljs.registerLanguage("coffeescript", function(c) {
  var b = {
    keyword: "in if for while finally new do return else break catch instanceof throw try this switch continue typeof delete debugger super then unless until loop of by when and or is isnt not",
    literal: "true false null undefined yes no on off",
    reserved: "case default function var void with const let enum export import native __hasProp __extends __slice __bind __indexOf",
    built_in: "npm require console print module global window document"
  };
  var a = "[A-Za-z$_][0-9A-Za-z$_]*";
  var f = c.inherit(c.TM, {
    b: a
  });
  var e = {
    cN: "subst",
    b: /#\{/,
    e: /}/,
    k: b
  };
  var d = [c.BNM, c.inherit(c.CNM, {
    starts: {
      e: "(\\s*/)?",
      r: 0
    }
  }), {
    cN: "string",
    v: [{
      b: /'''/,
      e: /'''/,
      c: [c.BE]
    }, {
      b: /'/,
      e: /'/,
      c: [c.BE]
    }, {
      b: /"""/,
      e: /"""/,
      c: [c.BE, e]
    }, {
      b: /"/,
      e: /"/,
      c: [c.BE, e]
    }]
  }, {
    cN: "regexp",
    v: [{
      b: "///",
      e: "///",
      c: [e, c.HCM]
    }, {
      b: "//[gim]*",
      r: 0
    }, {
      b: "/\\S(\\\\.|[^\\n])*?/[gim]*(?=\\s|\\W|$)"
    }]
  }, {
    cN: "property",
    b: "@" + a
  }, {
    b: "`",
    e: "`",
    eB: true,
    eE: true,
    sL: "javascript"
  }];
  e.c = d;
  return {
    aliases: ["coffee", "cson", "iced"],
    k: b,
    c: d.concat([{
        cN: "comment",
        b: "###",
        e: "###"
      },
      c.HCM, {
        cN: "function",
        b: "(" + a + "\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>",
        e: "[-=]>",
        rB: true,
        c: [f, {
          cN: "params",
          b: "\\(",
          rB: true,
          c: [{
            b: /\(/,
            e: /\)/,
            k: b,
            c: ["self"].concat(d)
          }]
        }]
      }, {
        cN: "class",
        bK: "class",
        e: "$",
        i: /[:="\[\]]/,
        c: [{
            bK: "extends",
            eW: true,
            i: /[:="\[\]]/,
            c: [f]
          },
          f
        ]
      }, {
        cN: "attribute",
        b: a + ":",
        e: ":",
        rB: true,
        eE: true,
        r: 0
      }
    ])
  }
});
hljs.registerLanguage("nginx", function(c) {
  var b = {
    cN: "variable",
    v: [{
      b: /\$\d+/
    }, {
      b: /\$\{/,
      e: /}/
    }, {
      b: "[\\$\\@]" + c.UIR
    }]
  };
  var a = {
    eW: true,
    l: "[a-z/_]+",
    k: {
      built_in: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
    },
    r: 0,
    i: "=>",
    c: [c.HCM, {
        cN: "string",
        c: [c.BE, b],
        v: [{
          b: /"/,
          e: /"/
        }, {
          b: /'/,
          e: /'/
        }]
      }, {
        cN: "url",
        b: "([a-z]+):/",
        e: "\\s",
        eW: true,
        eE: true
      }, {
        cN: "regexp",
        c: [c.BE, b],
        v: [{
          b: "\\s\\^",
          e: "\\s|{|;",
          rE: true
        }, {
          b: "~\\*?\\s+",
          e: "\\s|{|;",
          rE: true
        }, {
          b: "\\*(\\.[a-z\\-]+)+"
        }, {
          b: "([a-z\\-]+\\.)+\\*"
        }]
      }, {
        cN: "number",
        b: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
      }, {
        cN: "number",
        b: "\\b\\d+[kKmMgGdshdwy]*\\b",
        r: 0
      },
      b
    ]
  };
  return {
    aliases: ["nginxconf"],
    c: [c.HCM, {
      b: c.UIR + "\\s",
      e: ";|{",
      rB: true,
      c: [{
        cN: "title",
        b: c.UIR,
        starts: a
      }],
      r: 0
    }],
    i: "[^\\s\\}]"
  }
});
hljs.registerLanguage("json", function(a) {
  var e = {
    literal: "true false null"
  };
  var d = [a.QSM, a.CNM];
  var c = {
    cN: "value",
    e: ",",
    eW: true,
    eE: true,
    c: d,
    k: e
  };
  var b = {
    b: "{",
    e: "}",
    c: [{
      cN: "attribute",
      b: '\\s*"',
      e: '"\\s*:\\s*',
      eB: true,
      eE: true,
      c: [a.BE],
      i: "\\n",
      starts: c
    }],
    i: "\\S"
  };
  var f = {
    b: "\\[",
    e: "\\]",
    c: [a.inherit(c, {
      cN: null
    })],
    i: "\\S"
  };
  d.splice(d.length, 0, b, f);
  return {
    c: d,
    k: e,
    i: "\\S"
  }
});
hljs.registerLanguage("scss", function(a) {
  var c = "[a-zA-Z-][a-zA-Z0-9_-]*";
  var f = {
    cN: "variable",
    b: "(\\$" + c + ")\\b"
  };
  var d = {
    cN: "function",
    b: c + "\\(",
    rB: true,
    eE: true,
    e: "\\("
  };
  var b = {
    cN: "hexcolor",
    b: "#[0-9A-Fa-f]+"
  };
  var e = {
    cN: "attribute",
    b: "[A-Z\\_\\.\\-]+",
    e: ":",
    eE: true,
    i: "[^\\s]",
    starts: {
      cN: "value",
      eW: true,
      eE: true,
      c: [d, b, a.CSSNM, a.QSM, a.ASM, a.CBCM, {
        cN: "important",
        b: "!important"
      }]
    }
  };
  return {
    cI: true,
    i: "[=/|']",
    c: [a.CLCM, a.CBCM, d, {
        cN: "id",
        b: "\\#[A-Za-z0-9_-]+",
        r: 0
      }, {
        cN: "class",
        b: "\\.[A-Za-z0-9_-]+",
        r: 0
      }, {
        cN: "attr_selector",
        b: "\\[",
        e: "\\]",
        i: "$"
      }, {
        cN: "tag",
        b: "\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",
        r: 0
      }, {
        cN: "pseudo",
        b: ":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"
      }, {
        cN: "pseudo",
        b: "::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"
      },
      f, {
        cN: "attribute",
        b: "\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",
        i: "[^\\s]"
      }, {
        cN: "value",
        b: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
      }, {
        cN: "value",
        b: ":",
        e: ";",
        c: [d, f, b, a.CSSNM, a.QSM, a.ASM, {
          cN: "important",
          b: "!important"
        }]
      }, {
        cN: "at_rule",
        b: "@",
        e: "[{;]",
        k: "mixin include extend for if else each while charset import debug media page content font-face namespace warn",
        c: [d, f, a.QSM, a.ASM, b, a.CSSNM, {
          cN: "preprocessor",
          b: "\\s[A-Za-z0-9_.-]+",
          r: 0
        }]
      }
    ]
  }
});

/* InstantClick 3.0.1 | (C) 2014 Alexandre Dieulot | http://instantclick.io/license.html */

var InstantClick = function(document, location) {
  // Internal variables
  var $ua = navigator.userAgent,
      $hasTouch = 'createTouch' in document,
      $currentLocationWithoutHash,
      $urlToPreload,
      $preloadTimer,

  // Preloading-related variables
      $history = {},
      $xhr,
      $url = false,
      $title = false,
      $mustRedirect = false,
      $body = false,
      $timing = {},
      $isPreloading = false,
      $isWaitingForCompletion = false,
      $trackedAssets = [],

  // Variables defined by public functions
      $useWhitelist,
      $preloadOnMousedown,
      $delayBeforePreload,
      $eventsCallbacks = {
        fetch: [],
        receive: [],
        wait: [],
        change: []
      }


  ////////// HELPERS //////////


  function removeHash(url) {
    var index = url.indexOf('#')
    if (index < 0) {
      return url
    }
    return url.substr(0, index)
  }

  function getLinkTarget(target) {
    while (target.nodeName != 'A') {
      target = target.parentNode
    }
    return target
  }

  function isBlacklisted(elem) {
    do {
      if (!elem.hasAttribute) { // Parent of <html>
        break
      }
      if (elem.hasAttribute('data-instant')) {
        return false
      }
      if (elem.hasAttribute('data-no-instant')) {
        return true
      }
    }
    while (elem = elem.parentNode);
    return false
  }

  function isWhitelisted(elem) {
    do {
      if (!elem.hasAttribute) { // Parent of <html>
        break
      }
      if (elem.hasAttribute('data-no-instant')) {
        return false
      }
      if (elem.hasAttribute('data-instant')) {
        return true
      }
    }
    while (elem = elem.parentNode);
    return false
  }

  function triggerPageEvent(eventType, arg1) {
    for (var i = 0; i < $eventsCallbacks[eventType].length; i++) {
      $eventsCallbacks[eventType][i](arg1)
    }

    /* The `change` event takes one boolean argument: "isInitialLoad" */
  }

  function changePage(title, body, newUrl, scrollY) {
    document.title = title

    document.documentElement.replaceChild(body, document.body)
    /* We cannot just use `document.body = doc.body`, it causes Safari (tested
       5.1, 6.0 and Mobile 7.0) to execute script tags directly.
    */

    if (newUrl) {
      history.pushState(null, null, newUrl)

      var hashIndex = newUrl.indexOf('#'),
          hashElem = hashIndex > -1
                     && document.getElementById(newUrl.substr(hashIndex + 1)),
          offset = 0

      if (hashElem) {
        while (hashElem.offsetParent) {
          offset += hashElem.offsetTop

          hashElem = hashElem.offsetParent
        }
      }
      scrollTo(0, offset)

      $currentLocationWithoutHash = removeHash(newUrl)
    }
    else {
      scrollTo(0, scrollY)
    }
    instantanize()
    bar.done()
    triggerPageEvent('change', false)
  }

  function setPreloadingAsHalted() {
    $isPreloading = false
    $isWaitingForCompletion = false
  }


  ////////// EVENT HANDLERS //////////


  function mousedown(e) {
    preload(getLinkTarget(e.target).href)
  }

  function mouseover(e) {
    var a = getLinkTarget(e.target)
    a.addEventListener('mouseout', mouseout)

    if (!$delayBeforePreload) {
      preload(a.href)
    }
    else {
      $urlToPreload = a.href
      $preloadTimer = setTimeout(preload, $delayBeforePreload)
    }
  }

  function touchstart(e) {
    var a = getLinkTarget(e.target)
    if ($preloadOnMousedown) {
      a.removeEventListener('mousedown', mousedown)
    }
    else {
      a.removeEventListener('mouseover', mouseover)
    }
    preload(a.href)
  }

  function click(e) {
    if (e.which > 1 || e.metaKey || e.ctrlKey) { // Opening in new tab
      return
    }
    e.preventDefault()
    display(getLinkTarget(e.target).href)
  }

  function mouseout() {
    if ($preloadTimer) {
      clearTimeout($preloadTimer)
      $preloadTimer = false
      return
    }

    if (!$isPreloading || $isWaitingForCompletion) {
      return
    }
    $xhr.abort()
    setPreloadingAsHalted()
  }

  function readystatechange() {
    if ($xhr.readyState < 4) {
      return
    }
    if ($xhr.status == 0) {
      /* Request aborted */
      return
    }

    $timing.ready = +new Date - $timing.start
    triggerPageEvent('receive')

    if ($xhr.getResponseHeader('Content-Type').match(/\/(x|ht|xht)ml/)) {
      var doc = document.implementation.createHTMLDocument('')
      doc.documentElement.innerHTML = $xhr.responseText
      $title = doc.title
      $body = doc.body
      var urlWithoutHash = removeHash($url)
      $history[urlWithoutHash] = {
        body: $body,
        title: $title,
        scrollY: urlWithoutHash in $history ? $history[urlWithoutHash].scrollY : 0
      }

      var elems = doc.head.children,
          found = 0,
          elem,
          data

      for (var i = elems.length - 1; i >= 0; i--) {
        elem = elems[i]
        if (elem.hasAttribute('data-instant-track')) {
          data = elem.getAttribute('href') || elem.getAttribute('src') || elem.innerHTML
          for (var j = $trackedAssets.length - 1; j >= 0; j--) {
            if ($trackedAssets[j] == data) {
              found++
            }
          }
        }
      }
      if (found != $trackedAssets.length) {
        $mustRedirect = true // Assets have changed
      }
    }
    else {
      $mustRedirect = true // Not an HTML document
    }

    if ($isWaitingForCompletion) {
      $isWaitingForCompletion = false
      display($url)
    }
  }


  ////////// MAIN FUNCTIONS //////////


  function instantanize(isInitializing) {
    var as = document.getElementsByTagName('a'),
        a,
        domain = location.protocol + '//' + location.host

    for (var i = as.length - 1; i >= 0; i--) {
      a = as[i]
      if (a.target // target="_blank" etc.
          || a.hasAttribute('download')
          || a.href.indexOf(domain + '/') != 0 // Another domain, or no href attribute
          || (a.href.indexOf('#') > -1
              && removeHash(a.href) == $currentLocationWithoutHash) // Anchor
          || ($useWhitelist
              ? !isWhitelisted(a)
              : isBlacklisted(a))
         ) {
        continue
      }
      a.addEventListener('touchstart', touchstart)
      if ($preloadOnMousedown) {
        a.addEventListener('mousedown', mousedown)
      }
      else {
        a.addEventListener('mouseover', mouseover)
      }
      a.addEventListener('click', click)
    }
    if (!isInitializing) {
      var scripts = document.body.getElementsByTagName('script'),
          script,
          copy,
          parentNode,
          nextSibling

      for (i = 0, j = scripts.length; i < j; i++) {
        script = scripts[i]
        if (script.hasAttribute('data-no-instant')) {
          continue
        }
        copy = document.createElement('script')
        if (script.src) {
          copy.src = script.src
        }
        if (script.innerHTML) {
          copy.innerHTML = script.innerHTML
        }
        parentNode = script.parentNode
        nextSibling = script.nextSibling
        parentNode.removeChild(script)
        parentNode.insertBefore(copy, nextSibling)
      }
    }
  }

  function preload(url) {
    if (!$preloadOnMousedown
        && 'display' in $timing
        && +new Date - ($timing.start + $timing.display) < 100) {
      /* After a page is displayed, if the user's cursor happens to be above
         a link a mouseover event will be in most browsers triggered
         automatically, and in other browsers it will be triggered when the
         user moves his mouse by 1px.

         Here are the behavior I noticed, all on Windows:
         - Safari 5.1: auto-triggers after 0 ms
         - IE 11: auto-triggers after 30-80 ms (depends on page's size?)
         - Firefox: auto-triggers after 10 ms
         - Opera 18: auto-triggers after 10 ms

         - Chrome: triggers when cursor moved
         - Opera 12.16: triggers when cursor moved

         To remedy to this, we do not start preloading if last display
         occurred less than 100 ms ago. If they happen to click on the link,
         they will be redirected.
      */

      return
    }
    if ($preloadTimer) {
      clearTimeout($preloadTimer)
      $preloadTimer = false
    }

    if (!url) {
      url = $urlToPreload
    }

    if ($isPreloading && (url == $url || $isWaitingForCompletion)) {
      return
    }
    $isPreloading = true
    $isWaitingForCompletion = false

    $url = url
    $body = false
    $mustRedirect = false
    $timing = {
      start: +new Date
    }
    triggerPageEvent('fetch')
    $xhr.open('GET', url)
    $xhr.send()
  }

  function display(url) {
    if (!('display' in $timing)) {
      $timing.display = +new Date - $timing.start
    }
    if ($preloadTimer) {
      /* Happens when there’s a delay before preloading and that delay
         hasn't expired (preloading didn't kick in).
      */

      if ($url && $url != url) {
        /* Happens when the user clicks on a link before preloading
           kicks in while another link is already preloading.
        */

        location.href = url
        return
      }
      preload(url)
      bar.start(0, true)
      triggerPageEvent('wait')
      $isWaitingForCompletion = true
      return
    }
    if (!$isPreloading || $isWaitingForCompletion) {
      /* If the page isn't preloaded, it likely means the user has focused
         on a link (with his Tab key) and then pressed Return, which
         triggered a click.
         Because very few people do this, it isn't worth handling this case
         and preloading on focus (also, focusing on a link doesn't mean it's
         likely that you'll "click" on it), so we just redirect them when
         they "click".
         It could also mean the user hovered over a link less than 100 ms
         after a page display, thus we didn't start the preload (see
         comments in `preload()` for the rationale behind this.)

         If the page is waiting for completion, the user clicked twice while
         the page was preloading. Either on the same link or on another
         link. If it's the same link something might have gone wrong (or he
         could have double clicked), so we send him to the page the old way.
         If it's another link, it hasn't been preloaded, so we redirect the
         user the old way.
      */

      location.href = url
      return
    }
    if ($mustRedirect) {
      location.href = $url
      return
    }
    if (!$body) {
      bar.start(0, true)
      triggerPageEvent('wait')
      $isWaitingForCompletion = true
      return
    }
    $history[$currentLocationWithoutHash].scrollY = pageYOffset
    setPreloadingAsHalted()
    changePage($title, $body, $url)
  }


  ////////// PROGRESS BAR FUNCTIONS //////////


  var bar = function() {
    var $barContainer,
        $barElement,
        $barTransformProperty,
        $barProgress,
        $barTimer

    function init() {
      $barContainer = document.createElement('div')
      $barContainer.id = 'instantclick'
      $barElement = document.createElement('div')
      $barElement.id = 'instantclick-bar'
      $barElement.className = 'instantclick-bar'
      $barContainer.appendChild($barElement)

      var vendors = ['Webkit', 'Moz', 'O']

      $barTransformProperty = 'transform'
      if (!($barTransformProperty in $barElement.style)) {
        for (var i = 0; i < 3; i++) {
          if (vendors[i] + 'Transform' in $barElement.style) {
            $barTransformProperty = vendors[i] + 'Transform'
          }
        }
      }

      var transitionProperty = 'transition'
      if (!(transitionProperty in $barElement.style)) {
        for (var i = 0; i < 3; i++) {
          if (vendors[i] + 'Transition' in $barElement.style) {
            transitionProperty = '-' + vendors[i].toLowerCase() + '-' + transitionProperty
          }
        }
      }

      var style = document.createElement('style')
      style.innerHTML = '#instantclick{position:' + ($hasTouch ? 'absolute' : 'fixed') + ';top:0;left:0;width:100%;pointer-events:none;z-index:2147483647;' + transitionProperty + ':opacity .25s .1s}'
        + '.instantclick-bar{background:#29d;width:100%;margin-left:-100%;height:2px;' + transitionProperty + ':all .25s}'
      /* We set the bar's background in `.instantclick-bar` so that it can be
         overriden in CSS with `#instantclick-bar`, as IDs have higher priority.
      */
      document.head.appendChild(style)

      if ($hasTouch) {
        updatePositionAndScale()
        addEventListener('resize', updatePositionAndScale)
        addEventListener('scroll', updatePositionAndScale)
      }

    }

    function start(at, jump) {
      $barProgress = at
      if (document.getElementById($barContainer.id)) {
        document.body.removeChild($barContainer)
      }
      $barContainer.style.opacity = '1'
      if (document.getElementById($barContainer.id)) {
        document.body.removeChild($barContainer)
        /* So there's no CSS animation if already done once and it goes from 1 to 0 */
      }
      update()
      if (jump) {
        setTimeout(jumpStart, 0)
        /* Must be done in a timer, otherwise the CSS animation doesn't happen. */
      }
      clearTimeout($barTimer)
      $barTimer = setTimeout(inc, 500)
    }

    function jumpStart() {
      $barProgress = 10
      update()
    }

    function inc() {
      $barProgress += 1 + (Math.random() * 2)
      if ($barProgress >= 98) {
        $barProgress = 98
      }
      else {
        $barTimer = setTimeout(inc, 500)
      }
      update()
    }

    function update() {
      $barElement.style[$barTransformProperty] = 'translate(' + $barProgress + '%)'
      if (!document.getElementById($barContainer.id)) {
        document.body.appendChild($barContainer)
      }
    }

    function done() {
      if (document.getElementById($barContainer.id)) {
        clearTimeout($barTimer)
        $barProgress = 100
        update()
        $barContainer.style.opacity = '0'
        /* If you're debugging, setting this to 0.5 is handy. */
        return
      }

      /* The bar container hasn't been appended: It's a new page. */
      start($barProgress == 100 ? 0 : $barProgress)
      /* $barProgress is 100 on popstate, usually. */
      setTimeout(done, 0)
      /* Must be done in a timer, otherwise the CSS animation doesn't happen. */
    }

    function updatePositionAndScale() {
      /* Adapted from code by Sam Stephenson and Mislav Marohnić
         http://signalvnoise.com/posts/2407
      */

      $barContainer.style.left = pageXOffset + 'px'
      $barContainer.style.width = innerWidth + 'px'
      $barContainer.style.top = pageYOffset + 'px'

      var landscape = 'orientation' in window && Math.abs(orientation) == 90,
          scaleY = innerWidth / screen[landscape ? 'height' : 'width'] * 2
      /* We multiply the size by 2 because the progress bar is harder
         to notice on a mobile device.
      */
      $barContainer.style[$barTransformProperty] = 'scaleY(' + scaleY  + ')'
    }

    return {
      init: init,
      start: start,
      done: done
    }
  }()


  ////////// PUBLIC VARIABLE AND FUNCTIONS //////////

  var supported = 'pushState' in history
                  && (!$ua.match('Android') || $ua.match('Chrome/'))
                  && location.protocol != "file:"

  /* The state of Android's AOSP browsers:

     2.3.7: pushState appears to work correctly, but
            `doc.documentElement.innerHTML = body` is buggy.
            See details here: http://stackoverflow.com/q/21918564
            Note an issue anymore, but it may fail where 3.0 do, this needs
            testing again.

     3.0:   pushState appears to work correctly (though the URL bar is only
            updated on focus), but
            `document.documentElement.replaceChild(doc.body, document.body)`
        throws DOMException: WRONG_DOCUMENT_ERR.

     4.0.2: Doesn't support pushState.

     4.0.4,
     4.1.1,
     4.2,
     4.3:   pushState is here, but it doesn't update the URL bar.
            (Great logic there.)

     4.4:   Works correctly. Claims to be 'Chrome/30.0.0.0'.

     All androids tested with Android SDK's Emulator.
     Version numbers are from the browser's user agent.

     Because of this mess, the only whitelisted browser on Android is Chrome.
  */

  function init() {
    if ($currentLocationWithoutHash) {
      /* Already initialized */
      return
    }
    if (!supported) {
      triggerPageEvent('change', true)
      return
    }
    for (var i = arguments.length - 1; i >= 0; i--) {
      var arg = arguments[i]
      if (arg === true) {
        $useWhitelist = true
      }
      else if (arg == 'mousedown') {
        $preloadOnMousedown = true
      }
      else if (typeof arg == 'number') {
        $delayBeforePreload = arg
      }
    }
    $currentLocationWithoutHash = removeHash(location.href)
    $history[$currentLocationWithoutHash] = {
      body: document.body,
      title: document.title,
      scrollY: pageYOffset
    }

    var elems = document.head.children,
        elem,
        data
    for (var i = elems.length - 1; i >= 0; i--) {
      elem = elems[i]
      if (elem.hasAttribute('data-instant-track')) {
        data = elem.getAttribute('href') || elem.getAttribute('src') || elem.innerHTML
        /* We can't use just `elem.href` and `elem.src` because we can't
           retrieve `href`s and `src`s from the Ajax response.
        */
        $trackedAssets.push(data)
      }
    }

    $xhr = new XMLHttpRequest()
    $xhr.addEventListener('readystatechange', readystatechange)

    instantanize(true)

    bar.init()

    triggerPageEvent('change', true)

    addEventListener('popstate', function() {
      var loc = removeHash(location.href)
      if (loc == $currentLocationWithoutHash) {
        return
      }

      if (!(loc in $history)) {
        location.href = location.href
        /* Reloads the page while using cache for scripts, styles and images,
           unlike `location.reload()` */
        return
      }

      $history[$currentLocationWithoutHash].scrollY = pageYOffset
      $currentLocationWithoutHash = loc
      changePage($history[loc].title, $history[loc].body, false, $history[loc].scrollY)
    })
  }

  function on(eventType, callback) {
    $eventsCallbacks[eventType].push(callback)
  }


  /* The debug function isn't included by default to reduce file size.
     To enable it, add a slash at the beginning of the comment englobing
     the debug function, and uncomment "debug: debug," in the return
     statement below the function. */

  /*
  function debug() {
    return {
      currentLocationWithoutHash: $currentLocationWithoutHash,
      history: $history,
      xhr: $xhr,
      url: $url,
      title: $title,
      mustRedirect: $mustRedirect,
      body: $body,
      timing: $timing,
      isPreloading: $isPreloading,
      isWaitingForCompletion: $isWaitingForCompletion
    }
  }
  //*/


  ////////////////////


  return {
    // debug: debug,
    supported: supported,
    init: init,
    on: on
  }

}(document, location);

jQuery(function($) {

  InstantClick.init(50, true);

  hljs.initHighlightingOnLoad();

  $('.js-jump-top').on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({'scrollTop': 0});
  });

});

//# sourceMappingURL=rabit.js.map