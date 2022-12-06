(self.__LOADABLE_LOADED_CHUNKS__ = self.__LOADABLE_LOADED_CHUNKS__ || []).push([
	[1624], {
		4819: function(e, t, n) {
			var r = {
				"./chunks.png": 82728,
				"./eggbug.png": 40656,
				"./sixty.png": 64402,
				"./unyeah.png": 80025,
				"./yeah.png": 34132
			};

			function s(e) {
				var t = o(e);
				return n(t)
			}

			function o(e) {
				if (!n.o(r, e)) {
					var t = new Error("Cannot find module '" + e + "'");
					throw t.code = "MODULE_NOT_FOUND", t
				}
				return r[e]
			}
			s.keys = function() {
				return Object.keys(r)
			}, s.resolve = o, e.exports = s, s.id = 4819
		},
		80685: function(e, t, n) {
			var r = {
				"./host-aww.png": 21114,
				"./host-cry.png": 45272,
				"./host-evil.png": 25043,
				"./host-frown.png": 22122,
				"./host-joy.png": 97509,
				"./host-love.png": 19489,
				"./host-nervous.png": 52704,
				"./host-plead.png": 16185,
				"./host-shock.png": 31795,
				"./host-stare.png": 80254
			};

			function s(e) {
				var t = o(e);
				return n(t)
			}

			function o(e) {
				if (!n.o(r, e)) {
					var t = new Error("Cannot find module '" + e + "'");
					throw t.code = "MODULE_NOT_FOUND", t
				}
				return r[e]
			}
			s.keys = function() {
				return Object.keys(r)
			}, s.resolve = o, e.exports = s, s.id = 80685
		},
		23301: function(e, t, n) {
			"use strict";
			n.d(t, {
				mO: function() {
					return u
				},
				M1: function() {
					return p
				},
				qm: function() {
					return d
				}
			});
			var r = n(45984),
				s = n(18887),
				o = n.n(s),
				i = n(83160),
				a = n(60484);
			const l = /:[a-zA-Z\d-_]+:/gims;

			function c(e) {
				return e.keys().map((t => {
					const n = o().basename(t, o().extname(t));
					return {
						imageUrl: r.ZP.public.static.staticAsset({
							path: e(t)
						}).toString(),
						short_names: [n],
						name: n
					}
				}))
			}
			const u = c(n(4819)),
				p = c(n(80685)),
				f = new Map(u.reduce(((e, t) => [...e, [t.name, t]]), [])),
				m = new Map(p.reduce(((e, t) => [...e, [t.name, t]]), [])),
				d = e => (0, a.IS)(l, ((t, n, r, s, o) => {
					const a = n.reduce(((n, r, s) => {
						const o = [...n, {
							type: "text",
							value: r
						}];
						if (s < t.length) {
							const n = t[s].slice(1, t[s].length - 1);
							let r = f.get(n);
							!r && e.cohostPlus && (r = m.get(n)), r ? o.push({
								type: "element",
								tagName: "CustomEmoji",
								properties: {
									name: r.name,
									url: r.imageUrl
								},
								children: []
							}) : o.push({
								type: "text",
								value: t[s]
							})
						}
						return o
					}), []);
					return o.children.splice(s, 1, ...a), [i.AM, s + a.length]
				}))
		},
		21624: function(e, t, n) {
			"use strict";
			n.d(t, {
				Ml: function() {
					return z
				},
				e2: function() {
					return Y
				},
				h6: function() {
					return W
				},
				aK: function() {
					return J
				}
			});
			var r = n(94159),
				s = n(33233),
				o = n(45984);
			const i = r.memo((({
				name: e = "missing",
				url: t = o.ZP.public.static.staticAsset({
					path: s
				}).toString()
			}) => r.createElement("img", {
				src: t,
				alt: `:${e}:`,
				title: `:${e}:`,
				className: "m-0 inline-block aspect-square object-contain align-middle",
				style: {
					height: "var(--emoji-scale)"
				}
			})));
			i.displayName = "CustomEmoji";
			var a = n(20314),
				l = n(17789),
				c = n.n(l),
				u = n(94257),
				p = n(84008),
				f = n(21258),
				m = n(36585),
				d = n(34316),
				g = n(13427),
				h = n(70376),
				x = n(48428),
				y = n(97248),
				b = n(84371),
				w = n(8418),
				E = n(62855);
			const v = ({
				handle: e
			}) => r.createElement("a", {
				href: o.ZP.public.project.mainAppProfile({
					projectHandle: e
				}).toString(),
				className: "!font-bold !no-underline hover:!underline"
			}, "@", e);
			v.defaultProps = {
				handle: "ERROR"
			};
			var N = n(67368),
				_ = n(6087),
				k = n(37599),
				Z = n(67905);
			const L = r.memo((e => {
				const t = (0, r.useContext)(_.F);
				(0, r.useEffect)((() => {
					window.iframely && window.iframely.load()
				}));
				const {
					data: n,
					status: s
				} = (0, N.a)(["iframely", e.url], (({
					queryKey: e
				}) => fetch(`https://cdn.iframe.ly/api/iframely?url=${encodeURIComponent(e[1])}&key=${t.IFRAMELY_KEY}&iframe=1&omit_script=1`).then((e => e.json()))), {
					staleTime: 1 / 0,
					keepPreviousData: !0,
					retry: !1
				});
				let o;
				return n && n.error ? o = r.createElement("div", {
					className: "not-prose flex flex-row gap-8 bg-longan-200 py-8 pl-8"
				}, r.createElement("img", {
					className: "max-w-[106px] object-contain",
					src: (0, Z.S)(k)
				}), r.createElement("div", {
					className: "self-center",
					"data-testid": "iframely-error"
				}, r.createElement("p", {
					className: "font-league text-2xl font-semibold"
				}, "hmm..."), r.createElement("p", {
					className: "font-atkinson text-2xl"
				}, "something went wrong with this preview."), r.createElement("p", {
					className: "font-atkinson text-2xl"
				}, "here's why: ", n.error))) : n && n.html ? o = r.createElement("div", {
					dangerouslySetInnerHTML: {
						__html: n.html
					}
				}) : "loading" === s && (o = r.createElement("div", {
					className: "not-prose flex flex-row gap-8 bg-longan-200 py-8 pl-8"
				}, r.createElement("div", {
					className: "h-[102px] w-[106px]"
				}, " "), r.createElement("div", {
					className: "self-center"
				}, r.createElement("p", {
					className: "font-atkinson text-2xl"
				}, "loading...")))), r.createElement("div", {
					className: "bg-longan-100"
				}, o, r.createElement("p", {
					className: "mt-0 p-3 text-right text-gray-800"
				}, r.createElement("a", {
					href: e.url,
					target: "_blank",
					rel: "noopener noreferrer nofollow"
				}, e.url)))
			}));
			L.displayName = "IframelyEmbed";
			var A = n(23301),
				C = n(60484),
				D = n(81986),
				M = n(84879),
				j = n(30992),
				S = n(78791),
				O = n.n(S);
			const F = 256,
				P = (0, u.compile)({
					wordwrap: !1
				}),
				I = c()(h.R, {
					attributes: {
						"*": ["style"]
					},
					tagNames: ["video", "audio", "aside"]
				}),
				T = new Date(16565256e5),
				H = c()(h.R, {
					attributes: {
						"*": ["style"]
					},
					tagNames: ["video", "audio", "aside"]
				}),
				V = new Date(16684056e5),
				$ = c()(h.R, {
					attributes: {
						"*": ["style"]
					},
					tagNames: ["video", "audio", "aside"]
				}),
				R = e => e < T ? I : e < V ? H : $,
				U = e => t => {
					e < T || (0, j.Vn)(t, "element", ((e, t, n) => {
						if (null !== n && null !== t && e.properties?.style && "string" == typeof e.properties.style) try {
							let t = !1;
							const n = O()(e.properties.style);
							n && n.position && n.position.toLowerCase().includes("fixed") && (n.position = "static", t = !0), n && t && (e.properties.style = Object.entries(n).map((([e, t]) => `${e}:${t}`)).join(";"))
						} catch (e) {
							return
						}
					}))
				},
				B = (e, t, n) => {
					let r = (0, E.l)().use(b.Z);
					const s = ["nofollow"];
					return n.externalLinksInNewTab && s.push("noopener", "noreferrer"), t < F && (r = r.use(y.Z, {
						singleTilde: !1
					})), r.use(w.Z, {
						allowDangerousHtml: !0
					}).use((() => C.JM)).use((() => C.tu)).use(m.Z).use(g.Z, {
						...R(e)
					}).use((() => U(e))).use((() => {
						return t = e, e => {
							t < V || (0, j.Vn)(e, "element", ((e, t, n) => {
								if (null !== n && null !== t && e.properties?.style && "string" == typeof e.properties.style) try {
									let t = !1;
									const n = O()(e.properties.style);
									if (n)
										for (const e in n) e.startsWith("--") && (delete n[e], t = !0);
									n && t && (e.properties.style = Object.entries(n).map((([e, t]) => `${e}:${t}`)).join(";"))
								} catch (e) {
									return
								}
							}))
						};
						var t
					})).use(f.Z, {
						rel: s,
						target: n.externalLinksInNewTab ? "_blank" : "_self"
					})
				},
				q = (e, t, n) => {
					let r = (0, E.l)().use(b.Z);
					const s = ["nofollow"];
					return n.externalLinksInNewTab && s.push("noopener", "noreferrer"), t < F && (r = r.use(y.Z, {
						singleTilde: !1
					})), r.use(w.Z).use((() => C.JM)).use((() => C.tu)).use(g.Z, {
						...R(e)
					}).use((() => U(e))).use(f.Z, {
						rel: s,
						target: n.externalLinksInNewTab ? "_blank" : "_self"
					})
				};

			function K(e, t, n) {
				const s = e.map((e => e.markdown.content)).join("\n\n");
				let o = 0;
				for (const t of e) {
					if (o >= F) break;
					o = Math.max(o, t.markdown.content.split("\n", F).length)
				}
				try {
					let e = B(t, o, n).use((() => C.HD));
					return n.disableEmbeds || (e = e.use((() => C.fw))), e.use(A.qm, {
						cohostPlus: n.hasCohostPlus
					}).use(d.Z, {
						createElement: r.createElement,
						Fragment: r.Fragment,
						components: {
							Mention: v,
							CustomEmoji: i,
							IframelyEmbed: L
						}
					}).processSync(s).result
				} catch (e) {
					return (0, r.createElement)(r.Fragment, {}, [(0, r.createElement)("div", {
						className: "m-3 flex w-fit flex-row gap-2 rounded-lg border-2 border-solid border-cherry p-2 text-cherry no-prose"
					}, [(0, r.createElement)(D.Z, {
						className: "h-5 w-5 self-center not-prose flex-none"
					}), (0, r.createElement)("p", {
						className: "not-prose m-0 text-sm"
					}, "There was an issue rendering the HTML for this post! We've swapped to an HTML-less version for now, please check your syntax!")]), z(s, t, n)])
				}
			}

			function z(e, t, n) {
				const s = e.split("\n", F).length;
				return q(t, s, n).use((() => C.HD)).use(A.qm, {
					cohostPlus: n.hasCohostPlus
				}).use(d.Z, {
					createElement: r.createElement,
					Fragment: r.Fragment,
					components: {
						Mention: v,
						CustomEmoji: i
					}
				}).processSync(e).result
			}

			function J(e, t) {
				const n = function(e, t, n) {
					const r = e.split("\n", F).length;
					return q(t, r, {
						disableEmbeds: !0,
						externalLinksInNewTab: !0,
						hasCohostPlus: !1
					}).use(x.Z).processSync(e).toString()
				}(e, t);
				return P(n)
			}

			function W(e, t) {
				if (!t.myPost) {
					if (e.effectiveAdultContent && e.cws.length > 0) {
						const t = e.cws.join(", ");
						return p.ZP.t("client:opengraph.cws-and-adult", {
							defaultValue: "18+ content; content warnings: {{cwList}}",
							cwList: t
						})
					}
					if (e.cws.length > 0) {
						const t = e.cws.join(", ");
						return p.ZP.t("client:opengraph.cws", {
							defaultValue: "(content warning: {{cwList}})",
							cwList: t
						})
					}
					if (e.effectiveAdultContent) return p.ZP.t("client:opengraph.adult-content", {
						defaultValue: "this post contains 18+ content"
					})
				}
				const n = e.publishedAt ? M.ou.fromISO(e.publishedAt).toJSDate() : new Date,
					r = e.blocks.filter(a.D_),
					s = function(e, t, n) {
						const r = e.split("\n", F).length;
						return B(t, r, {
							disableEmbeds: !0,
							externalLinksInNewTab: !0,
							hasCohostPlus: !1
						}).use(x.Z).processSync(e).toString()
					}((r.length > 0 ? r : e.blocks).map((e => (0, a.xy)(e))).join("\n\n"), n);
				return P(s)
			}

			function Y(e, t, n) {
				const r = e.filter(a.D_),
					s = r.findIndex((e => "---" === e.markdown.content));
				let o = [];
				s > -1 && (o = r.splice(s));
				const i = K(r, t, n),
					l = K(o, t, n);
				return {
					initial: i,
					initialLength: r.length,
					expanded: l,
					expandedLength: o.length
				}
			}
		},
		60484: function(e, t, n) {
			"use strict";
			n.d(t, {
				tu: function() {
					return p
				},
				HD: function() {
					return u
				},
				JM: function() {
					return f
				},
				fw: function() {
					return m
				},
				IS: function() {
					return c
				}
			});
			var r = n(30992),
				s = n(83160);

			function o(e, t, n = "") {
				return "string" != typeof e && (e.global && n.indexOf("g") < 0 && (n += "g"), e.ignoreCase && n.indexOf("i") < 0 && (n += "i"), e.multiline && n.indexOf("m") < 0 && (n += "m"), e = e.source), new RegExp(e.replace(/#\{(\w+)\}/g, (function(e, n) {
					let r = t[n] || "";
					return "string" != typeof r && (r = r.source), r
				})), n)
			}
			const i = /[@＠]/,
				a = o("(#{validMentionPrecedingChars})(#{atSigns})([a-zA-Z0-9-]{3,})", {
					validMentionPrecedingChars: /(?:^|[^a-zA-Z0-9_!#$%&*@＠\\/]|(?:^|[^a-zA-Z0-9_+~.-\\/]))/,
					atSigns: i
				}, "g"),
				l = o(/^(?:#{atSigns}|[#{latinAccentChars}]|:\/\/)/, {
					atSigns: i,
					latinAccentChars: /\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u024F\u0253\u0254\u0256\u0257\u0259\u025B\u0263\u0268\u026F\u0272\u0289\u028B\u02BB\u0300-\u036F\u1E00-\u1EFF/
				}),
				c = (e, t) => n => {
					(0, r.Vn)(n, "text", ((n, r, s) => {
						if (null === s || null === r) return;
						const o = n.value.match(e);
						if (o) {
							const i = n.value.split(e);
							if (i.length - 1 !== o.length) return;
							return t(o, i, n, r, s)
						}
					}))
				},
				u = e => {
					(0, r.Vn)(e, "text", ((e, t, n) => {
						if (null === n || null === t) return;
						const r = e.value,
							o = function(e) {
								if (!e.match(i)) return [];
								const t = [];
								return e.replace(a, (function(e, n, r, s, o, i) {
									if (!i.slice(o + e.length).match(l)) {
										const e = o + n.length,
											r = e + s.length + 1;
										t.push({
											handle: s,
											indices: [e, r]
										})
									}
									return ""
								})), t
							}(r);
						if (o.length) {
							const e = [];
							let i = 0;
							return o.forEach(((t, n, s) => {
								const [o, a] = t.indices;
								e.push({
									type: "text",
									value: r.slice(i, o)
								}), e.push({
									type: "element",
									tagName: "Mention",
									properties: {
										handle: t.handle
									},
									children: [{
										type: "text",
										value: `@${t.handle}`
									}]
								}), i = a, n === s.length - 1 && e.push({
									type: "text",
									value: r.slice(i)
								})
							})), n.children.splice(t, 1, ...e), [s.AM, t + e.length]
						}
					}))
				},
				p = e => {
					(0, r.Vn)(e, "element", ((e, t, n) => {
						if (null !== n && null !== t) {
							if ("a" === e.tagName && e.properties?.id?.includes("fnref")) return n.children.splice(t, 1, ...e.children), [s.AM, t];
							if ("a" === e.tagName && e.properties?.href?.includes("fnref")) return n.children.splice(t, 1), [s.AM, t];
							if ("h2" === e.tagName && e.properties?.id?.includes("footnote-label")) {
								const e = {
									tagName: "hr",
									type: "element",
									children: [],
									properties: {
										"aria-label": "Footnotes",
										style: "margin-bottom: -0.5rem;"
									}
								};
								n.children.splice(t, 1, e)
							}
						}
					}))
				},
				f = e => {
					(0, r.Vn)(e, {
						type: "element",
						tagName: "img"
					}, (e => {
						e.properties?.alt && (e.properties.title = e.properties.alt)
					}))
				},
				m = e => {
					(0, r.Vn)(e, {
						type: "element",
						tagName: "a"
					}, ((e, t, n) => {
						if (null !== n && null !== t && 1 == e.children.length && "text" == e.children[0].type && e.position && e.children[0].position && e.children[0].position.start.offset == e.position.start.offset && 1 == n.children.length) return "element" === n.type && (n.tagName = "div"), n.children.splice(t, 1, {
							type: "element",
							tagName: "IframelyEmbed",
							properties: {
								url: e.properties?.href
							},
							children: []
						}), !0
					}))
				}
		},
		82728: function(e, t, n) {
			"use strict";
			e.exports = n.p + "f59b84127fa7b6c48b6c.png"
		},
		40656: function(e, t, n) {
			"use strict";
			e.exports = n.p + "41454e429d62b5cb7963.png"
		},
		64402: function(e, t, n) {
			"use strict";
			e.exports = n.p + "9a6014af31fb1ca65a1f.png"
		},
		80025: function(e, t, n) {
			"use strict";
			e.exports = n.p + "5cf84d596a2c422967de.png"
		},
		34132: function(e, t, n) {
			"use strict";
			e.exports = n.p + "014b0a8cc35206ef151d.png"
		},
		33233: function(e, t, n) {
			"use strict";
			e.exports = n.p + "1a0afcb65b352a493928.svg"
		},
		21114: function(e, t, n) {
			"use strict";
			e.exports = n.p + "9bb403f3822c6457baf6.png"
		},
		45272: function(e, t, n) {
			"use strict";
			e.exports = n.p + "530f8cf75eac87716702.png"
		},
		25043: function(e, t, n) {
			"use strict";
			e.exports = n.p + "cb9a5640d7ef7b361a1a.png"
		},
		22122: function(e, t, n) {
			"use strict";
			e.exports = n.p + "99c7fbf98de865cc9726.png"
		},
		97509: function(e, t, n) {
			"use strict";
			e.exports = n.p + "53635f5fe850274b1a7d.png"
		},
		19489: function(e, t, n) {
			"use strict";
			e.exports = n.p + "c45b6d8f9de20f725b98.png"
		},
		52704: function(e, t, n) {
			"use strict";
			e.exports = n.p + "e5d55348f39c65a20148.png"
		},
		16185: function(e, t, n) {
			"use strict";
			e.exports = n.p + "fa883e2377fea8945237.png"
		},
		31795: function(e, t, n) {
			"use strict";
			e.exports = n.p + "bfa6d6316fd95ae76803.png"
		},
		80254: function(e, t, n) {
			"use strict";
			e.exports = n.p + "a09d966cd188c9ebaa4c.png"
		},
		37599: function(e, t, n) {
			"use strict";
			e.exports = n.p + "4fd0f5fb276c23f89e61.png"
		}
	}
]);