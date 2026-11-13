// The four case studies, shared by the Home and Work pages so a case study opens in place on either
// page. Each is a <dialog class="drawer" id="..."> that script.js opens from links with
// data-drawer="...". Edit the case studies here: this is their only copy.
// Load this file before script.js.

const caseStudies = `
<dialog class="drawer" id="onebcn" aria-labelledby="onebcn-title">
	<div class="drawer_head">
		<p class="drawer_kicker">Case study</p>
		<button class="drawer_close" type="button" data-drawer-close aria-label="Close the case study"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
	</div>
	<div class="drawer_body">
		<article class="project">
			<div class="project_body">
				<h2 class="project_title" id="onebcn-title">OneBCN Advisors</h2>
				<p class="lead">An early-stage, two-sided investor-matching platform, taken from prototype to production in two months.</p>
				<div class="case_block">
					<h3 class="case_label">Problem</h3>
					<p>Founders need to reach investors whose focus fits their startup. Investors need verified, sourced information to screen opportunities quickly.</p>
				</div>
				<div class="case_block">
					<h3 class="case_label">Users</h3>
					<ul class="case_list">
						<li>Startup founders</li>
						<li>VCs and business angels</li>
						<li>Investors' own AI assistants, through the API and MCP server</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Decisions and tradeoffs</h3>
					<ul class="highlights">
						<li><strong>Security before launch</strong>Fixed an auth bypass and open database access before going live, instead of after</li>
						<li><strong>Sourced answers only</strong>The AI agent only cites live search results, and financial figures are computed by the server, never generated</li>
						<li><strong>Founders first</strong>Pivoted to a founder-first product, with investor tools behind a single entry point and a paid plan enforced on the server</li>
						<li><strong>AI-assisted, test-gated</strong>Built with Claude Code; 700+ automated tests and CI on every change decide what ships</li>
						<li><strong>Cost control</strong>A token cost model with per-user spending limits for every AI feature: about €0.10 of AI cost per founder a month, on about €10 a month of hosting</li>
						<li><strong>GDPR by design</strong>Firm-level data only, a source and date on every fact, signed opt-outs and 12-month retention</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">What shipped</h3>
					<ul class="case_list">
						<li>Founder marketplace: decks with per-slide analytics, tracked links, pitches, intro requests and a Kanban CRM</li>
						<li>Investor research agent on Google Gemini with 10 modes, from market maps to valuations</li>
						<li>REST API and MCP server with HMAC-signed keys, an OpenAPI 3.1 spec and protected webhooks</li>
						<li>A fund research pipeline cross-checked against the official CNMV register, replacing about 210 hours (~€2,100) of manual research</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Results</h3>
					<ul class="pcard_stats">
						<li><strong>2 months</strong><span>prototype to production</span></li>
						<li><strong>10+</strong><span>founders onboarded</span></li>
						<li><strong>700+</strong><span>automated tests</span></li>
						<li><strong>64</strong><span>verified funds listed, from 850+ researched</span></li>
					</ul>
				</div>
			</div>
			<aside class="project_meta" aria-label="Project details">
				<dl>
					<div><dt>My role</dt><dd>Co-founder and CTO, leading product and engineering</dd></div>
					<div><dt>When</dt><dd>Aug 2026 – Present</dd></div>
					<div><dt>Where</dt><dd>Barcelona, Spain (Remote)</dd></div>
					<div><dt>Website</dt><dd><a href="https://onebcn.io" target="_blank" rel="noopener">onebcn.io</a></dd></div>
				</dl>
				<ul class="chips" aria-label="Technologies">
					<li class="chip">TypeScript</li>
					<li class="chip">React 19</li>
					<li class="chip">Vite</li>
					<li class="chip">Tailwind CSS</li>
					<li class="chip">Node.js</li>
					<li class="chip">Express</li>
					<li class="chip">Firebase</li>
					<li class="chip">GCP</li>
					<li class="chip">Google Gemini API</li>
					<li class="chip">MCP</li>
					<li class="chip">Vitest</li>
					<li class="chip">GitHub Actions</li>
					<li class="chip">Figma</li>
				</ul>
			</aside>
		</article>
	</div>
</dialog>

<dialog class="drawer" id="cmi" aria-labelledby="cmi-title">
	<div class="drawer_head">
		<p class="drawer_kicker">Case study</p>
		<button class="drawer_close" type="button" data-drawer-close aria-label="Close the case study"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
	</div>
	<div class="drawer_body">
		<article class="project">
			<div class="project_body">
				<h2 class="project_title" id="cmi-title">CMI: Continuous Market Insights</h2>
				<p class="lead">Proceedit's AI market insights, packaged as a subscription app for individuals and teams and as an API for businesses.</p>
				<div class="case_block">
					<h3 class="case_label">Problem</h3>
					<p>Proceedit's AI market models needed a product: a way for people and teams to follow model signals on the assets they care about, and for businesses to receive them in their own systems.</p>
				</div>
				<div class="case_block">
					<h3 class="case_label">Users</h3>
					<ul class="case_list">
						<li>Individual investors</li>
						<li>Teams that share a plan</li>
						<li>Businesses integrating the signals through the API</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Decisions and tradeoffs</h3>
					<ul class="highlights">
						<li><strong>Credits, not a flat fee</strong>A free monthly trial and credits consumed per asset, with Starter and Advanced plans and volume discounts</li>
						<li><strong>Seats for teams</strong>The Advanced plan adds extra seats, so one subscription serves a whole team</li>
						<li><strong>One codebase</strong>Flutter for iOS, Android and the web, instead of three separate apps, released to the App Store and Google Play</li>
						<li><strong>Regulatory requirements</strong>I built the GDPR, MiFID II, CNMV and MAR requirements into this customer-facing financial product</li>
						<li><strong>App and API</strong>The same insights in the app and through a B2B API</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">What shipped</h3>
					<ul class="case_list">
						<li>The CMI app with market insights per asset: indicator, previous and current model state, and price scenarios</li>
						<li>Subscriptions, credits and extra seats, sold through the Shopify store</li>
						<li>The CMI B2B API for business clients</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Results</h3>
					<ul class="pcard_stats">
						<li><strong>300+</strong><span>subscribers, paid and free trial, 60+ of them in the app</span></li>
						<li><strong>3</strong><span>B2B API clients</span></li>
						<li><strong>99.9%</strong><span>availability</span></li>
					</ul>
				</div>
			</div>
			<aside class="project_meta" aria-label="Project details">
				<dl>
					<div><dt>My role</dt><dd>Director and product owner</dd></div>
					<div><dt>When</dt><dd>2025–2026</dd></div>
					<div><dt>Where</dt><dd>Barcelona, Spain (Remote, with on-site visits)</dd></div>
					<div><dt>Website</dt><dd><a href="https://proceedit.shop/pages/market_insights" target="_blank" rel="noopener">CMI on proceedit.shop</a></dd></div>
				</dl>
				<ul class="chips" aria-label="Technologies">
					<li class="chip">Flutter</li>
					<li class="chip">FlutterFlow</li>
					<li class="chip">Firebase</li>
					<li class="chip">Dart</li>
					<li class="chip">REST API</li>
					<li class="chip">Shopify</li>
					<li class="chip">Python</li>
				</ul>
			</aside>
		</article>
	</div>
</dialog>

<dialog class="drawer" id="platform" aria-labelledby="platform-title">
	<div class="drawer_head">
		<p class="drawer_kicker">Case study</p>
		<button class="drawer_close" type="button" data-drawer-close aria-label="Close the case study"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
	</div>
	<div class="drawer_body">
		<article class="project">
			<div class="project_body">
				<h2 class="project_title" id="platform-title">Internal platform: apps, engines and API</h2>
				<p class="lead">One platform for Proceedit's internal applications and sites, fed by the company's engines instead of manual updates.</p>
				<div class="case_block">
					<h3 class="case_label">Problem</h3>
					<p>Internal tools and sites had to be built and updated one by one, and keeping content current took manual work.</p>
				</div>
				<div class="case_block">
					<h3 class="case_label">Users</h3>
					<ul class="case_list">
						<li>Proceedit's internal teams</li>
						<li>Master Program participants, through the rebuilt Podia website</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Decisions and tradeoffs</h3>
					<ul class="highlights">
						<li><strong>Build once</strong>One generic app definition rendered on web, mobile and desktop</li>
						<li><strong>Shared components</strong>A component library instead of one-off screens</li>
						<li><strong>Content from data</strong>Pages are generated from the database the engines produce, so content stays current on its own</li>
						<li><strong>One central API</strong>Every app reaches the engines and bots through it, with token-based authentication</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">What shipped</h3>
					<ul class="case_list">
						<li>The platform and its component library</li>
						<li>The Podia website, rebuilt on the platform</li>
						<li>Integration with Proceedit's server engines through the central API</li>
						<li>Removed connectivity bottlenecks in the AWS EC2 and RDS setup</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Results</h3>
					<ul class="pcard_stats">
						<li><strong>24+</strong><span>engines and reusable components</span></li>
						<li><strong>~110 h</strong><span>of development saved across 4 apps by reusing components (~€1,100)</span></li>
						<li><strong>~20%</strong><span>lower server costs, Exoscale → AWS</span></li>
					</ul>
				</div>
			</div>
			<aside class="project_meta" aria-label="Project details">
				<dl>
					<div><dt>My role</dt><dd>Manager, then Director</dd></div>
					<div><dt>When</dt><dd>2023–2026</dd></div>
					<div><dt>Where</dt><dd>Barcelona, Spain (Remote, with on-site visits)</dd></div>
					<div><dt>Delivery</dt><dd>Scrum, cross-functional team</dd></div>
				</dl>
				<ul class="chips" aria-label="Technologies">
					<li class="chip">Cross-platform</li>
					<li class="chip">REST API</li>
					<li class="chip">GCP</li>
					<li class="chip">JWT</li>
					<li class="chip">Python</li>
				</ul>
			</aside>
		</article>
	</div>
</dialog>

<dialog class="drawer" id="workshop" aria-labelledby="workshop-title">
	<div class="drawer_head">
		<p class="drawer_kicker">Case study</p>
		<button class="drawer_close" type="button" data-drawer-close aria-label="Close the case study"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8"/></svg></button>
	</div>
	<div class="drawer_body">
		<article class="project">
			<div class="project_body">
				<h2 class="project_title" id="workshop-title">AI Workshop Management System</h2>
				<p class="lead">An AI assistant that runs a car workshop through Telegram: bookings, client profiles, call notes and repair history. The owner works in Russian; clients write in Romanian or Russian.</p>
				<div class="case_block">
					<h3 class="case_label">Problem</h3>
					<p>The owner handled bookings, client calls, field visits and repair history by hand, about 10 hours a week.</p>
				</div>
				<div class="case_block">
					<h3 class="case_label">Users</h3>
					<ul class="case_list">
						<li>The workshop owner, by text or voice in Russian</li>
						<li>Clients, booking themselves in Romanian or Russian</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Decisions and tradeoffs</h3>
					<ul class="highlights">
						<li><strong>Guardrails in code</strong>Dates are checked against what the client actually said, no time is called free or taken without a real availability check, changing another client's booking needs confirmation, and a backup model takes over when the main one is overloaded</li>
						<li><strong>The owner stays in control</strong>Clients book themselves, but the owner approves, and a reliability rating offers later times to clients who missed appointments</li>
						<li><strong>Built on Free-Bots</strong>The assistant runs on my own bot platform, so each new client bot is set up on the fly</li>
						<li><strong>Runs unattended</strong>Docker on the client's Windows PC, with Git-based sync and an hourly auto-update that rolls back a failed release by itself</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">What shipped</h3>
					<ul class="case_list">
						<li>An assistant on Google Gemini function calling that books, moves and cancels jobs from the owner's text or voice messages, keeps the repair history and answers questions about the schedule</li>
						<li>Call automation: recorded calls are transcribed and turned into a client profile, the car, the problem, a time estimate, follow-up tasks and one-tap booking options</li>
						<li>A scheduling engine for workshop capacity and field visits: travel time, working hours, holidays, and multi-day, paused or extended jobs</li>
						<li>Bilingual client self-booking with live availability and free-time buttons</li>
					</ul>
				</div>
				<div class="case_block">
					<h3 class="case_label">Results</h3>
					<ul class="pcard_stats">
						<li><strong>49</strong><span>AI function-calling tools</span></li>
						<li><strong>110</strong><span>automated tests, plus replays of real conversations</span></li>
						<li><strong>2</strong><span>languages: Romanian and Russian</span></li>
						<li><strong>~10 h</strong><span>saved a week for the owner, ~€5,200 a year</span></li>
					</ul>
				</div>
			</div>
			<aside class="project_meta" aria-label="Project details">
				<dl>
					<div><dt>My role</dt><dd>Sole engineer</dd></div>
					<div><dt>When</dt><dd>2026</dd></div>
					<div><dt>Where</dt><dd>Moldova (Remote, with on-site visits)</dd></div>
				</dl>
				<ul class="chips" aria-label="Technologies">
					<li class="chip">Python</li>
					<li class="chip">python-telegram-bot</li>
					<li class="chip">Google Gemini API</li>
					<li class="chip">SQLite</li>
					<li class="chip">Docker</li>
					<li class="chip">Git</li>
					<li class="chip">pytest</li>
				</ul>
			</aside>
		</article>
	</div>
</dialog>
`;

document.querySelector("main")?.insertAdjacentHTML("beforeend", caseStudies);
