// Tutorial content data
const tutorialSections = [
    {
        id: 'intro',
        title: '🌟 Introduction to Weave Evaluations',
        content: `
            <p>Welcome to <strong>Weave Evaluations</strong>! This guide teaches you to build robust evaluation systems for AI applications using the <strong>OpenUI project</strong> as a comprehensive real-world example.</p>
            
            <div class="concept-card">
                <h3>What is Weave?</h3>
                <p>Weave is W&B's toolkit for developing AI-powered applications with rigorous evaluation and observability. Based on the official documentation, Weave provides:</p>
                <ul>
                    <li><strong>Evaluation Framework</strong> - Run systematic evaluations with datasets and scorers</li>
                    <li><strong>Model Tracking</strong> - Track model performance across experiments</li>
                    <li><strong>Flexible Scoring</strong> - Custom scoring functions for domain-specific metrics</li>
                    <li><strong>End-to-end Tracing</strong> - Debug complex AI workflows with full observability</li>
                </ul>
            </div>

            <h3>🎯 Core Evaluation Components</h3>
            <p>Every Weave evaluation consists of three fundamental components working together:</p>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <h4>📊 Dataset</h4>
                    <p>Collection of examples to evaluate against</p>
                    <pre><code class="language-python"># OpenUI dataset example
dataset = [
    {"prompt": "Create a button", "expected": "Button"},
    {"prompt": "Make a card", "expected": "Card"}
]</code></pre>
                </div>
                <div class="feature-card">
                    <h4>🤖 Model</h4>
                    <p>Your AI application being evaluated</p>
                    <pre><code class="language-python"># OpenUI model
class OpenUIModel(Model):
    @weave.op()
    async def predict(self, prompt: str):
        # Generate HTML from prompt
        return {"html": "...", "name": "..."}
</code></pre>
                </div>
                <div class="feature-card">
                    <h4>📏 Scorers</h4>
                    <p>Functions that assess output quality</p>
                    <pre><code class="language-python"># OpenUI scorer
@weave.op()
async def quality_score(prompt, prediction):
    return {"relevance": 4, "polish": 3}
</code></pre>
                </div>
                <div class="feature-card">
                    <h4>🔄 Evaluation</h4>
                    <p>Orchestrates the entire evaluation process</p>
                    <pre><code class="language-python"># Complete evaluation
evaluation = Evaluation(
    dataset=dataset, 
    scorers=[quality_score]
)
await evaluation.evaluate(model)
</code></pre>
                </div>
            </div>

            <h3>🎨 Why OpenUI as Example?</h3>
            <div class="example-box">
                <p>OpenUI demonstrates advanced evaluation patterns that work for many AI applications:</p>
                <ul>
                    <li><strong>Complex Output Generation</strong> - HTML + CSS with structured metadata</li>
                    <li><strong>Multi-dimensional Quality</strong> - Relevance, polish, media responsiveness, contrast</li>
                    <li><strong>Visual Validation</strong> - Optional screenshot-based evaluation</li>
                    <li><strong>Production Ready</strong> - Error handling, retries, and monitoring</li>
                    <li><strong>Flexible Configuration</strong> - Multiple models, temperature settings, screenshot modes</li>
                </ul>
            </div>

            <h3>🚀 Quick Preview</h3>
            <p>Here's what a complete OpenUI evaluation looks like:</p>
            
            <pre><code class="language-python"># 1. Initialize Weave
weave.init("openui-dev")

# 2. Setup evaluation
evaluation = Evaluation(
    dataset=weave.ref("eval:v0").get(),
    scorers=[scores]  # Multi-dimensional AI scoring
)

# 3. Run evaluation
await evaluation.evaluate(
    OpenUIModel(
        prompt_template=SYSTEM_PROMPT,
        take_screenshot=False  # Fast text-only mode
    )
)

# Results: {'scores': {'relevance': {'mean': 4.0}, 'polish': {'mean': 3.3}, ...}}</code></pre>

            <div class="warning-box">
                <h4>💡 Learning Approach</h4>
                <p>We'll start with official Weave concepts, then see them implemented in OpenUI's production-ready evaluation system. This gives you both theoretical understanding and practical patterns you can adapt.</p>
            </div>

            <p>Ready to build evaluation systems that scale? Let's start! 🎉</p>
        `
    },
    {
        id: 'setup',
        title: '⚙️ Environment Setup',
        content: `
            <p>Before building evaluations, we need to set up our environment with the necessary dependencies and configuration.</p>

            <h3>📦 Installation</h3>
            <p>The OpenUI project uses modern Python packaging with <code>uv</code>:</p>

            <pre><code class="language-bash"># Install with evaluation dependencies
uv sync --frozen --extra eval

# Alternative with pip
pip install -e ".[eval]"</code></pre>

            <div class="concept-card">
                <h3>🔧 Key Dependencies</h3>
                <p>Our evaluation system requires several packages:</p>
                <ul>
                    <li><strong>weave</strong> - Core evaluation framework</li>
                    <li><strong>openai</strong> - LLM API integration</li>
                    <li><strong>playwright</strong> - Browser automation for screenshots</li>
                    <li><strong>pandas</strong> - Data manipulation</li>
                    <li><strong>mistletoe</strong> - Markdown parsing</li>
                    <li><strong>pillow</strong> - Image processing</li>
                </ul>
            </div>

            <h3>🌍 Environment Variables</h3>
            <p>Create a <code>.env</code> file with your API keys:</p>

            <pre><code class="language-bash"># Weights & Biases / Weave Configuration
WANDB_API_KEY=your_wandb_api_key
WANDB_ENTITY=your_wandb_entity
WANDB_PROJECT=your_project_name

# LLM API Keys
OPENAI_API_KEY=your_openai_key
# ANTHROPIC_API_KEY=your_anthropic_key (optional)
# GROQ_API_KEY=your_groq_key (optional)</code></pre>

            <h3>🎭 Browser Setup for Screenshots</h3>
            <p>If you want screenshot functionality:</p>

            <pre><code class="language-bash"># Install Playwright browsers
playwright install</code></pre>

            <div class="warning-box">
                <h4>⚠️ Optional Dependencies</h4>
                <p>Screenshots are optional! The evaluation system works perfectly without them, using text-only analysis. This makes development faster and reduces infrastructure requirements.</p>
            </div>

            <h3>🚀 Quick Test</h3>
            <p>Verify your setup by running a simple evaluation:</p>

            <pre><code class="language-bash"># Start the dev server
python -m openui --dev 2>&1 | tee server.log

# In another terminal, run evaluation
python -m openui.eval.evaluate_weave</code></pre>

            <button class="interactive-button" onclick="showCodeExample('setup')">
                🔍 Show Setup Verification Code
            </button>
        `
    },
    {
        id: 'concepts',
        title: '🧠 Core Weave Evaluation Concepts',
        content: `
            <p>Based on the official Weave documentation, let's understand how evaluations work and see them implemented in OpenUI.</p>

            <div class="concept-card">
                <h3>🎯 Official Weave Evaluation Pattern</h3>
                <p>According to Weave docs, every evaluation follows this structure:</p>
                <pre><code class="language-python"># Standard Weave evaluation pattern
evaluation = weave.Evaluation(
    dataset=examples,
    scorers=[scoring_functions]
)
await evaluation.evaluate(model_or_function)</code></pre>
            </div>

            <h3>📊 Datasets: Your Test Cases</h3>
            <p>Weave datasets are collections of examples. OpenUI's dataset structure:</p>

            <pre><code class="language-python"># OpenUI dataset follows Weave patterns
examples = [
    {"prompt": "Create a simple button component", "name": "Button", "emoji": "🔘"},
    {"prompt": "Make a card component with header", "name": "Card", "emoji": "🃏"}
]

# Published to Weave for versioning
dataset = weave.Dataset(name="eval", rows=examples)
weave.publish(dataset)</code></pre>

            <h3>🤖 Models: Two Implementation Approaches</h3>
            <p>Weave supports both <code>Model</code> classes and <code>@weave.op</code> functions:</p>

            <div class="feature-grid">
                <div class="feature-card">
                    <h4>📋 Model Class (OpenUI uses this)</h4>
                    <pre><code class="language-python">class OpenUIModel(Model):
    @weave.op()
    async def predict(self, prompt: str):
        # Your AI logic here
        return {"html": "...", "name": "..."}</code></pre>
                </div>
                <div class="feature-card">
                    <h4>⚡ Function Approach</h4>
                    <pre><code class="language-python">@weave.op()
def function_to_evaluate(prompt: str):
    # Simpler for basic cases
    return {'generated_text': 'result'}</code></pre>
                </div>
            </div>

            <h3>📏 Scorers: The Heart of Evaluation</h3>
            <p>Weave scorers are decorated functions that assess quality. OpenUI's scorer:</p>

            <pre><code class="language-python"># OpenUI's AI-powered scorer (follows Weave patterns)
@weave.op()
async def scores(prompt: str, model_output: dict) -> dict:
    # Uses GPT-4 Vision to score across 4 dimensions
    return await scoring_model.predict(prompt, model_output)

# Weave automatically aggregates scores:
# {'scores': {'relevance': {'mean': 4.0}, 'polish': {'mean': 3.3}, ...}}</code></pre>

            <h3>🔄 Complete Evaluation Workflow</h3>
            <p>Here's how OpenUI implements the official Weave pattern:</p>

            <pre><code class="language-python"># 1. Initialize Weave (required)
weave.init("openui-dev")

# 2. Load dataset (Weave's dataset versioning)
dataset = weave.ref("eval:v0").get()

# 3. Create model instance
model = OpenUIModel(
    prompt_template=SYSTEM_PROMPT,
    model_name="gpt-3.5-turbo",
    take_screenshot=False
)

# 4. Setup evaluation with scorers
evaluation = Evaluation(
    dataset=dataset,
    scorers=[scores]  # Custom AI-powered scoring
)

# 5. Run evaluation (Weave handles the orchestration)
results = await evaluation.evaluate(model)
# Results: {'scores': {...}, 'model_latency': {...}}</code></pre>

            <div class="example-box">
                <h4>🎯 Why This Pattern Works</h4>
                <p>Weave's design provides:</p>
                <ul>
                    <li><strong>Automatic tracking</strong> - All calls logged with trace URLs</li>
                    <li><strong>Score aggregation</strong> - Mean, count automatically calculated</li>
                    <li><strong>Async support</strong> - Handles LLM calls efficiently</li>
                    <li><strong>Versioning</strong> - Datasets and models are versioned</li>
                    <li><strong>UI integration</strong> - Results viewable in W&B interface</li>
                </ul>
            </div>

            <button class="interactive-button" onclick="showCodeExample('concepts')">
                🧪 See OpenUI's Complete Implementation
            </button>
        `
    },
    {
        id: 'datasets',
        title: '📊 Creating and Managing Datasets',
        content: `
            <p>Datasets are the foundation of good evaluations. Let's learn how to create, manage, and version them effectively.</p>

            <h3>📝 Dataset Creation</h3>
            <p>OpenUI datasets are simple CSV files that get published to Weave:</p>

            <pre><code class="language-csv">prompt,name,emoji
"Create a simple button component","Button","🔘"
"Make a card component with header and content","Card","🃏"
"Build a navigation bar","Navigation","🧭"</code></pre>

            <div class="concept-card">
                <h3>🏗️ Dataset Publishing Workflow</h3>
                <ol class="step-list">
                    <li>Create CSV file with test cases</li>
                    <li>Use Weave to publish dataset</li>
                    <li>Reference dataset in evaluations</li>
                    <li>Version and iterate as needed</li>
                </ol>
            </div>

            <h3>🚀 Publishing Code</h3>
            <p>Here's how OpenUI publishes datasets:</p>

            <pre><code class="language-python">import pandas as pd
import weave

# Initialize Weave
weave.init("openui-dev")

# Load data from CSV
data = pd.read_csv("datasets/eval.csv")
rows = data.to_dict('records')

# Publish to Weave
dataset = weave.Dataset(name="eval", rows=rows)
weave.publish(dataset)</code></pre>

            <h3>📚 Dataset Best Practices</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <h4>🎯 Representative Coverage</h4>
                    <p>Include diverse examples covering edge cases, common patterns, and failure modes</p>
                </div>
                <div class="feature-card">
                    <h4>📏 Right-sized</h4>
                    <p>Start small (10-50 examples), then grow based on model performance insights</p>
                </div>
                <div class="feature-card">
                    <h4>🔄 Version Control</h4>
                    <p>Use Weave's built-in versioning to track dataset evolution</p>
                </div>
                <div class="feature-card">
                    <h4>📊 Quality over Quantity</h4>
                    <p>Better to have fewer high-quality, well-crafted examples than many poor ones</p>
                </div>
            </div>

            <h3>🔍 Loading Published Datasets</h3>
            <p>Once published, reference datasets in your evaluations:</p>

            <pre><code class="language-python"># Load published dataset
dataset = weave.ref("eval:v0").get()

# Or reference latest version
dataset = weave.ref("eval").get()

print(f"Dataset has {len(dataset.rows)} examples")</code></pre>

            <div class="warning-box">
                <h4>⚠️ Dataset Evolution</h4>
                <p>As your model improves, your dataset should evolve too. Add challenging examples that expose current limitations, and remove examples that are no longer relevant.</p>
            </div>

            <button class="interactive-button" onclick="showDatasetExample()">
                📊 Explore Dataset Structure
            </button>
            <button class="interactive-button" onclick="showCodeExample('datasets')">
                🔧 Show Publishing Script
            </button>
        `
    },
    {
        id: 'models',
        title: '🤖 Building Evaluation Models',
        content: `
            <p>Models in Weave represent the system you're evaluating. Let's build a robust model for UI component generation.</p>

            <h3>🏗️ Model Architecture</h3>
            <p>OpenUI's model inherits from <code>PromptModel</code> and handles the complete generation pipeline:</p>

            <pre><code class="language-python">class OpenUIModel(PromptModel):
    prompt_template: str
    model_name: Optional[str] = "gpt-3.5-turbo"
    take_screenshot: Optional[bool] = False
    temp: Optional[float] = 0.3
    
    @weave.op()
    async def predict(self, prompt: str) -> dict:
        # Step 1: Generate with LLM
        completion = await self.actually_predict(prompt)
        result = completion.choices[0].message.content
        
        # Step 2: Parse structured output
        parsed = self.extract_html(result)
        
        # Step 3: Optional screenshot generation
        if self.take_screenshot:
            await self.screenshot(parsed["html"], name)
            parsed["desktop_img"] = f"./{self.model_dir}/{name}.png"
            
        return parsed</code></pre>

            <div class="concept-card">
                <h3>🎯 Key Design Principles</h3>
                <ul>
                    <li><strong>Async by default</strong> - Handle LLM API calls efficiently</li>
                    <li><strong>Configurable</strong> - Easy to switch models, temperatures, etc.</li>
                    <li><strong>Robust parsing</strong> - Handle malformed LLM outputs gracefully</li>
                    <li><strong>Optional features</strong> - Screenshots can be disabled for speed</li>
                </ul>
            </div>

            <h3>🎨 Prompt Engineering</h3>
            <p>The system prompt is crucial for consistent output:</p>

            <pre><code class="language-python">SYSTEM_PROMPT = """🎉 Greetings, TailwindCSS Virtuoso! 🌟

You've mastered the art of frontend design and TailwindCSS! 
Your mission is to transform detailed descriptions into stunning 
HTML using the versatility of TailwindCSS.

*Design Guidelines:*
- Utilize placehold.co for placeholder images
- Leverage modern ES6 JavaScript and native browser APIs
- Use these color variables for consistency:
  --background, --foreground, --primary, --secondary, etc.

Always start your response with frontmatter:
---
name: Fancy Button
emoji: 🎉
---

&lt;button class="bg-blue-500 text-white p-2 rounded-lg"&gt;Click me&lt;/button&gt;
"""</code></pre>

            <h3>🔧 LLM Client Configuration</h3>
            <p>Support multiple LLM providers with a flexible client system:</p>

            <pre><code class="language-python">@property
def client(self):
    if self.model_name.startswith("ollama/"):
        return AsyncOpenAI(base_url="http://localhost:11434/v1")
    elif self.model_name.startswith("litellm/"):
        return AsyncOpenAI(
            api_key=os.getenv("LITELLM_API_KEY"),
            base_url=os.getenv("LITELLM_BASE_URL")
        )
    else:
        return AsyncOpenAI()  # Default OpenAI</code></pre>

            <h3>📱 Screenshot Integration</h3>
            <p>Optional visual validation through automated screenshots:</p>

            <pre><code class="language-python">async def screenshot(self, html: str, name: str):
    screenshot_dir = base_dir / self.model_dir
    screenshot_dir.mkdir(exist_ok=True)
    
    # Generate desktop and mobile screenshots
    await gen_screenshots(name, html, screenshot_dir)</code></pre>

            <div class="example-box">
                <h4>🎯 Error Handling Strategy</h4>
                <p>The model gracefully handles various failure modes:</p>
                <ul>
                    <li><strong>Rate limits</strong> - Exponential backoff and retry</li>
                    <li><strong>Malformed output</strong> - Fallback parsing strategies</li>
                    <li><strong>Screenshot failures</strong> - Continue without visual validation</li>
                    <li><strong>Network issues</strong> - Timeout and retry logic</li>
                </ul>
            </div>

            <button class="interactive-button" onclick="showModelExample()">
                🤖 Explore Model Code
            </button>
            <button class="interactive-button" onclick="showCodeExample('models')">
                🔧 Run Model Independently
            </button>
        `
    },
    {
        id: 'scoring',
        title: '📏 Implementing Scoring Systems',
        content: `
            <p>Scoring systems determine how well your model performed. OpenUI uses a sophisticated multi-dimensional approach.</p>

            <h3>🎯 Multi-Dimensional Scoring</h3>
            <p>Instead of a single score, OpenUI evaluates across four key dimensions:</p>

            <div class="feature-grid">
                <div class="feature-card">
                    <h4>🎯 Relevance (1-4)</h4>
                    <p>Does the output match the user's request?</p>
                    <span class="tag">Core Quality</span>
                </div>
                <div class="feature-card">
                    <h4>✨ Polish (1-4)</h4>
                    <p>Is the design professional and well-crafted?</p>
                    <span class="tag">Visual Quality</span>
                </div>
                <div class="feature-card">
                    <h4>📱 Media Quality (1-4)</h4>
                    <p>How well does it work across devices?</p>
                    <span class="tag">Responsive</span>
                </div>
                <div class="feature-card">
                    <h4>🌓 Contrast (1-4)</h4>
                    <p>Does it handle light and dark modes?</p>
                    <span class="tag">Accessibility</span>
                </div>
            </div>

            <h3>🤖 AI-Powered Scoring</h3>
            <p>OpenUI uses GPT-4 Vision to score components based on screenshots:</p>

            <pre><code class="language-python">class OpenUIScoringModel(Model):
    @weave.op()
    async def predict(self, prompt: str, prediction: dict) -> dict:
        # Check if screenshots are available
        has_screenshots = (
            prediction.get("desktop_img") is not None and 
            prediction.get("mobile_img") is not None
        )
        
        if has_screenshots:
            # Score with visual analysis
            content = [
                {"type": "text", "text": user_message},
                {"type": "image_url", "image_url": {"url": desktop_screenshot}},
                {"type": "image_url", "image_url": {"url": mobile_screenshot}}
            ]
        else:
            # Score based on HTML code only
            content = [
                {"type": "text", "text": user_message},
                {"type": "text", "text": f"HTML Code:\\n{prediction['html']}"}
            ]
            
        response = await client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": scoring_prompt},
                     {"role": "user", "content": content}],
            response_format={"type": "json_object"}
        )</code></pre>

            <div class="concept-card">
                <h3>🎨 Scoring Prompt Design</h3>
                <p>The scoring prompt is carefully crafted to ensure consistent evaluation:</p>
                <ul>
                    <li><strong>Clear criteria</strong> - Specific definitions for each dimension</li>
                    <li><strong>Consistent scale</strong> - 1-4 rating with clear anchors</li>
                    <li><strong>JSON output</strong> - Structured format for analysis</li>
                    <li><strong>Reasoning</strong> - Explanation of scores for debugging</li>
                </ul>
            </div>

            <h3>📊 Score Aggregation</h3>
            <p>Weave automatically aggregates scores across your dataset:</p>

            <pre><code class="language-python"># Individual scorer functions
@weave.op()
async def scores(prompt: str, model_output: dict) -> dict:
    return await scoring_model.predict(prompt, model_output)

# Evaluation results
{
    'scores': {
        'relevance': {'mean': 4.0},
        'polish': {'mean': 3.33},
        'media': {'mean': 3.0},
        'contrast': {'mean': 3.0}
    },
    'model_latency': {'mean': 1.2}
}</code></pre>

            <div class="example-box">
                <h4>🔍 Example Scoring Session</h4>
                <p><strong>Prompt:</strong> "Create a simple button component"</p>
                <p><strong>Generated HTML:</strong> <code>&lt;button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg"&gt;Click me&lt;/button&gt;</code></p>
                <p><strong>Scores:</strong></p>
                <ul>
                    <li>Relevance: 4 (Perfect - clearly a button)</li>
                    <li>Polish: 3 (Good styling, could be more elegant)</li>
                    <li>Media: 3 (Works on mobile, but not optimized)</li>
                    <li>Contrast: 3 (Uses theme colors, handles modes well)</li>
                </ul>
            </div>

            <h3>🛠️ Customizing Scoring</h3>
            <p>You can create custom scorers for specific needs:</p>

            <pre><code class="language-python">@weave.op()
def accessibility_score(example: dict, prediction: dict) -> float:
    html = prediction['html']
    score = 0
    
    # Check for alt attributes
    if 'alt=' in html:
        score += 1
        
    # Check for semantic elements
    if any(tag in html for tag in ['&lt;nav&gt;', '&lt;main&gt;', '&lt;button&gt;']):
        score += 1
        
    # Check for ARIA labels
    if 'aria-' in html:
        score += 1
        
    return min(score, 4)  # Cap at 4</code></pre>

            <button class="interactive-button" onclick="showScoringExample()">
                📊 Interactive Scoring Demo
            </button>
            <button class="interactive-button" onclick="showCodeExample('scoring')">
                🔧 Build Custom Scorer
            </button>
        `
    },
    {
        id: 'running',
        title: '🚀 Running Evaluations',
        content: `
            <p>Now let's put it all together and run complete evaluations! OpenUI provides flexible options for different use cases.</p>

            <h3>⚡ Quick Evaluation</h3>
            <p>Run a basic evaluation without screenshots (fast for development):</p>

            <pre><code class="language-bash"># Start the dev server first
python -m openui --dev 2>&1 | tee server.log

# Run evaluation in another terminal
python -m openui.eval.evaluate_weave</code></pre>

            <h3>📸 Full Evaluation with Screenshots</h3>
            <p>Include visual validation for comprehensive assessment:</p>

            <pre><code class="language-bash"># Run with screenshot generation
python -m openui.eval.evaluate_weave --screenshots

# Or with specific model
python -m openui.eval.evaluate_weave gpt-4-turbo --screenshots</code></pre>

            <div class="concept-card">
                <h3>🎛️ Evaluation Configuration</h3>
                <p>The system supports various configuration options:</p>
                <ul>
                    <li><strong>Model Selection</strong> - OpenAI, Anthropic, local models</li>
                    <li><strong>Screenshot Mode</strong> - Enable/disable visual validation</li>
                    <li><strong>Temperature</strong> - Control creativity vs consistency</li>
                    <li><strong>Dataset Version</strong> - Pin to specific dataset versions</li>
                </ul>
            </div>

            <h3>📊 Understanding Results</h3>
            <p>Evaluation results provide detailed insights:</p>

            <pre><code class="language-json">{
    "scores": {
        "relevance": {"mean": 4.0, "count": 3},
        "polish": {"mean": 3.33, "count": 3}, 
        "media": {"mean": 3.0, "count": 3},
        "contrast": {"mean": 3.0, "count": 3}
    },
    "model_latency": {"mean": 1.2},
    "total_examples": 3,
    "success_rate": 1.0
}</code></pre>

            <h3>🔍 Debugging Evaluations</h3>
            <p>When evaluations don't go as expected:</p>

            <div class="step-list">
                <li><strong>Check server logs</strong> - <code>tail -f server.log</code></li>
                <li><strong>Verify Weave traces</strong> - Look for 🍩 URLs in output</li>
                <li><strong>Inspect individual predictions</strong> - Debug single examples</li>
                <li><strong>Monitor API usage</strong> - Track costs and rate limits</li>
            </div>

            <div class="warning-box">
                <h4>⚠️ Common Issues</h4>
                <ul>
                    <li><strong>Server not running</strong> - Screenshots need the annotation service</li>
                    <li><strong>API keys missing</strong> - Check your .env file</li>
                    <li><strong>Rate limits</strong> - The system includes automatic retry logic</li>
                    <li><strong>Malformed outputs</strong> - LLM responses may need better prompts</li>
                </ul>
            </div>

            <h3>🎯 Single Example Testing</h3>
            <p>Test individual cases for debugging:</p>

            <pre><code class="language-python">async def test_single_example():
    weave.init("openui-dev")
    model = OpenUIModel(prompt_template=SYSTEM_PROMPT)
    
    # Test specific prompt
    result = await model.predict("Create a modern card component")
    print(f"Generated: {result}")
    
    # Score the result
    score = await scoring_model.predict(
        "Create a modern card component", 
        result
    )
    print(f"Scores: {score}")

# Run it
asyncio.run(test_single_example())</code></pre>

            <div class="example-box">
                <h4>🎯 Evaluation Workflow</h4>
                <ol>
                    <li>Start development server</li>
                    <li>Configure evaluation parameters</li>
                    <li>Run evaluation script</li>
                    <li>Monitor progress and logs</li>
                    <li>Analyze results in Weave UI</li>
                    <li>Iterate on model/prompts/dataset</li>
                </ol>
            </div>

            <button class="interactive-button" onclick="showRunExample()">
                🎮 Interactive Run Demo
            </button>
            <button class="interactive-button" onclick="showCodeExample('running')">
                🔧 Debug Evaluation Issues
            </button>
        `
    },
    {
        id: 'advanced',
        title: '🚀 Advanced Features',
        content: `
            <p>Now that you understand the basics, let's explore advanced features that make evaluations even more powerful.</p>

            <h3>🔍 Prompt Search & Optimization</h3>
            <p>OpenUI includes automatic prompt optimization using the HOGWILD approach:</p>

            <pre><code class="language-bash"># Enable prompt search mode
HOGWILD=1 python -m openui.eval.evaluate_weave gpt-4-turbo</code></pre>

            <div class="concept-card">
                <h3>🧬 How Prompt Search Works</h3>
                <ol class="step-list">
                    <li><strong>Baseline</strong> - Evaluate current prompt performance</li>
                    <li><strong>Variations</strong> - Generate prompt variations automatically</li>
                    <li><strong>Testing</strong> - Run evaluations on each variation</li>
                    <li><strong>Selection</strong> - Keep the best performing prompts</li>
                </ol>
            </div>

            <h3>🖼️ Advanced Screenshot Features</h3>
            <p>The screenshot system provides rich visual validation:</p>

            <pre><code class="language-python"># Screenshot configuration options
await gen_screenshots(
    name="component_test",
    html=generated_html,
    img_dir=output_directory,
    # Features:
    # - Desktop and mobile viewports
    # - Light and dark mode variants  
    # - Combined image outputs
    # - Automatic image optimization
)</code></pre>

            <h3>📊 Custom Metrics & Analytics</h3>
            <p>Build domain-specific evaluation metrics:</p>

            <pre><code class="language-python">@weave.op()
def component_complexity_score(example: dict, prediction: dict) -> dict:
    html = prediction['html']
    
    metrics = {
        'element_count': len(re.findall(r'&lt;\\w+', html)),
        'class_count': len(re.findall(r'class="[^"]*"', html)),
        'nesting_depth': calculate_nesting_depth(html),
        'tailwind_usage': count_tailwind_classes(html)
    }
    
    # Normalize to 1-4 scale
    complexity_score = min(4, metrics['element_count'] / 5)
    
    return {
        'complexity': complexity_score,
        'metrics': metrics
    }</code></pre>

            <h3>🔄 A/B Testing Models</h3>
            <p>Compare different models systematically:</p>

            <pre><code class="language-python">async def compare_models():
    models = [
        OpenUIModel(model_name="gpt-3.5-turbo", temp=0.3),
        OpenUIModel(model_name="gpt-4-turbo", temp=0.1),
        OpenUIModel(model_name="claude-3-sonnet", temp=0.2)
    ]
    
    dataset = weave.ref("eval:v0").get()
    
    for model in models:
        evaluation = Evaluation(
            dataset=dataset,
            scorers=[scores, component_complexity_score]
        )
        await evaluation.evaluate(model)</code></pre>

            <div class="feature-grid">
                <div class="feature-card">
                    <h4>⚡ Performance Optimization</h4>
                    <ul>
                        <li>Async evaluation for speed</li>
                        <li>Batch processing</li>
                        <li>Caching strategies</li>
                        <li>Resource management</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <h4>🔒 Production Readiness</h4>
                    <ul>
                        <li>Error handling & retries</li>
                        <li>Rate limit management</li>
                        <li>Monitoring & alerting</li>
                        <li>Cost tracking</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <h4>📈 Advanced Analytics</h4>
                    <ul>
                        <li>Statistical significance</li>
                        <li>Confidence intervals</li>
                        <li>Trend analysis</li>
                        <li>Regression detection</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <h4>🔧 Extensibility</h4>
                    <ul>
                        <li>Custom scorers</li>
                        <li>Plugin architecture</li>
                        <li>Integration hooks</li>
                        <li>Export capabilities</li>
                    </ul>
                </div>
            </div>

            <h3>🌐 Integration Patterns</h3>
            <p>Common ways to integrate evaluations into your workflow:</p>

            <div class="example-box">
                <h4>🔄 CI/CD Integration</h4>
                <pre><code class="language-yaml"># GitHub Actions example
- name: Run Evaluations
  run: |
    python -m openui.eval.evaluate_weave
    # Fail build if scores drop below threshold</code></pre>
            </div>

            <div class="example-box">
                <h4>📊 Monitoring & Alerting</h4>
                <pre><code class="language-python"># Alert on regression
if current_scores['relevance']['mean'] < baseline - 0.2:
    send_alert("Model performance regression detected")</code></pre>
            </div>

            <h3>🎯 Best Practices Summary</h3>
            <ul>
                <li><strong>Start simple</strong> - Basic text evaluation first</li>
                <li><strong>Iterate quickly</strong> - Use small datasets for development</li>
                <li><strong>Automate early</strong> - Integrate into development workflow</li>
                <li><strong>Monitor trends</strong> - Track performance over time</li>
                <li><strong>Document everything</strong> - Keep evaluation criteria clear</li>
            </ul>

            <button class="interactive-button" onclick="showAdvancedExample()">
                🚀 Advanced Features Demo
            </button>
            <button class="interactive-button" onclick="showCodeExample('advanced')">
                🔧 Build Production Pipeline
            </button>
        `
    },
    {
        id: 'conclusion',
        title: '🎉 Conclusion & Next Steps',
        content: `
            <p>Congratulations! You've learned how to build robust evaluation systems with Weave. Let's recap and explore what's next.</p>

            <div class="concept-card">
                <h3>🎯 What You've Accomplished</h3>
                <ul>
                    <li><strong>🧠 Core Concepts</strong> - Models, datasets, and scorers</li>
                    <li><strong>📊 Dataset Management</strong> - Creation, versioning, and publishing</li>
                    <li><strong>🤖 Model Building</strong> - Async, configurable, robust models</li>
                    <li><strong>📏 Scoring Systems</strong> - Multi-dimensional AI-powered evaluation</li>
                    <li><strong>🚀 Production Deployment</strong> - Running and debugging evaluations</li>
                    <li><strong>⚡ Advanced Features</strong> - Optimization, A/B testing, monitoring</li>
                </ul>
            </div>

            <h3>🚀 Next Steps</h3>
            <div class="feature-grid">
                <div class="feature-card">
                    <h4>🔬 Experiment</h4>
                    <p>Try the OpenUI evaluation system with your own prompts and datasets</p>
                    <button class="interactive-button" onclick="openLink('https://github.com/wandb/openui')">
                        GitHub Repo
                    </button>
                </div>
                <div class="feature-card">
                    <h4>📚 Learn More</h4>
                    <p>Dive deeper into Weave documentation and advanced features</p>
                    <button class="interactive-button" onclick="openLink('https://weave-docs.wandb.ai/')">
                        Weave Docs
                    </button>
                </div>
                <div class="feature-card">
                    <h4>🛠️ Build Your Own</h4>
                    <p>Apply these patterns to your own AI applications and use cases</p>
                    <button class="interactive-button" onclick="showTemplateCode()">
                        Get Template
                    </button>
                </div>
                <div class="feature-card">
                    <h4>🤝 Community</h4>
                    <p>Join the community and share your evaluation experiences</p>
                    <button class="interactive-button" onclick="openLink('https://wandb.ai/community')">
                        W&B Community
                    </button>
                </div>
            </div>

            <h3>🎁 Key Takeaways</h3>
            <div class="step-list">
                <li><strong>Evaluation is crucial</strong> - You can't improve what you don't measure</li>
                <li><strong>Start simple, iterate fast</strong> - Basic evaluations beat no evaluations</li>
                <li><strong>Automate everything</strong> - Make evaluation part of your development flow</li>
                <li><strong>Multi-dimensional scoring</strong> - Single metrics rarely tell the full story</li>
                <li><strong>Weave makes it easy</strong> - Focus on your domain, not infrastructure</li>
            </div>

            <div class="example-box">
                <h4>🎯 Evaluation Maturity Levels</h4>
                <ul>
                    <li><strong>Level 1: Manual</strong> - Ad-hoc testing by humans</li>
                    <li><strong>Level 2: Automated</strong> - Scripted evaluations on fixed datasets</li>
                    <li><strong>Level 3: Continuous</strong> - Integrated into development workflow</li>
                    <li><strong>Level 4: Intelligent</strong> - Self-improving evaluation systems</li>
                </ul>
                <p>OpenUI demonstrates Level 3 practices, with some Level 4 features like prompt optimization.</p>
            </div>

            <h3>🔗 Useful Resources</h3>
            <ul>
                <li><a href="https://github.com/wandb/openui" target="_blank">OpenUI GitHub Repository</a></li>
                <li><a href="https://weave-docs.wandb.ai/" target="_blank">Weave Documentation</a></li>
                <li><a href="https://wandb.ai/site/experiment-tracking" target="_blank">W&B Experiment Tracking</a></li>
                <li><a href="https://community.wandb.ai/" target="_blank">W&B Community Forum</a></li>
            </ul>

            <div class="warning-box">
                <h4>💡 Remember</h4>
                <p>Great evaluations are an investment in your AI application's quality and reliability. They pay dividends in confidence, debugging speed, and user satisfaction. Start today!</p>
            </div>

            <h3>🚀 Ready to Build?</h3>
            <p>You now have all the tools and knowledge to build world-class evaluation systems. Go forth and evaluate! 🎉</p>

            <div style="text-align: center; margin-top: 3rem;">
                <button class="interactive-button" onclick="resetTutorial()" style="background: var(--accent-color);">
                    🔄 Restart Tutorial
                </button>
                <button class="interactive-button" onclick="downloadSummary()">
                    📄 Download Summary
                </button>
            </div>
        `
    }
];

// Tutorial state
let currentSection = 0;
const totalSections = tutorialSections.length;

// Initialize tutorial
document.addEventListener('DOMContentLoaded', function() {
    showSection(0);
});

// Navigation functions
function changeSection(direction) {
    const newSection = currentSection + direction;
    if (newSection >= 0 && newSection < totalSections) {
        showSection(newSection);
    }
}

function showSection(sectionIndex) {
    currentSection = sectionIndex;
    
    // Update content
    const content = document.getElementById('tutorialContent');
    content.innerHTML = `
        <div class="section active">
            <h2>${tutorialSections[sectionIndex].title}</h2>
            ${tutorialSections[sectionIndex].content}
        </div>
    `;
    
    // Update progress
    const progressFill = document.getElementById('progressFill');
    const progress = ((sectionIndex + 1) / totalSections) * 100;
    progressFill.style.width = `${progress}%`;
    
    // Update counter
    document.getElementById('sectionCounter').textContent = `${sectionIndex + 1} / ${totalSections}`;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = sectionIndex === 0;
    document.getElementById('nextBtn').disabled = sectionIndex === totalSections - 1;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-highlight code
    if (window.Prism) {
        Prism.highlightAll();
    }
}

// Interactive functions
function showCodeExample(section) {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    const examples = {
        setup: `# Verify your Weave setup
import weave
import os

# Check environment
print("WANDB_API_KEY:", "✅ Set" if os.getenv("WANDB_API_KEY") else "❌ Missing")
print("OPENAI_API_KEY:", "✅ Set" if os.getenv("OPENAI_API_KEY") else "❌ Missing")

# Initialize Weave
weave.init("test-project")
print("🎉 Weave initialized successfully!")`,
        
        concepts: `# Complete evaluation flow example
import asyncio
import weave
from openui.eval.evaluate_weave import OpenUIModel, scores

async def run_evaluation():
    # Initialize
    weave.init("openui-dev")
    
    # Create model
    model = OpenUIModel(
        prompt_template="Create beautiful TailwindCSS components...",
        model_name="gpt-3.5-turbo"
    )
    
    # Test single prediction
    result = await model.predict("Create a simple button")
    print(f"Generated: {result}")
    
    # Score the result
    score = await scores("Create a simple button", result)
    print(f"Scores: {score}")

# Run it
asyncio.run(run_evaluation())`,
        
        datasets: `# Dataset creation and publishing
import pandas as pd
import weave

# Initialize Weave
weave.init("openui-dev")

# Create dataset from CSV
data = pd.read_csv("eval.csv")
rows = data.to_dict('records')

print(f"Created dataset with {len(rows)} examples:")
for i, row in enumerate(rows[:3]):
    print(f"{i+1}. {row['prompt']} → {row['name']} {row['emoji']}")

# Publish to Weave
dataset = weave.Dataset(name="eval", rows=rows)
weave.publish(dataset)
print("📊 Dataset published to Weave!")`,
        
        models: `# Run a model independently
import asyncio
from openui.eval.evaluate_weave import OpenUIModel, SYSTEM_PROMPT

async def test_model():
    model = OpenUIModel(
        prompt_template=SYSTEM_PROMPT,
        model_name="gpt-3.5-turbo",
        take_screenshot=False,  # Fast testing
        temp=0.1  # Low temperature for consistency
    )
    
    test_prompts = [
        "Create a modern button component",
        "Build a responsive card with image", 
        "Make a navigation bar with dropdowns"
    ]
    
    for prompt in test_prompts:
        print(f"\\n🎯 Testing: {prompt}")
        result = await model.predict(prompt)
        print(f"   Name: {result['name']}")
        print(f"   Emoji: {result['emoji']}")
        print(f"   HTML: {result['html'][:100]}...")

asyncio.run(test_model())`,
        
        scoring: `# Build a custom scorer
import weave
import re

@weave.op()
def accessibility_scorer(example: dict, prediction: dict) -> dict:
    html = prediction['html']
    score = 0
    issues = []
    
    # Check for semantic HTML
    semantic_tags = ['<nav>', '<main>', '<section>', '<article>', '<button>']
    if any(tag in html for tag in semantic_tags):
        score += 1
    else:
        issues.append("Missing semantic HTML elements")
    
    # Check for alt attributes
    img_tags = re.findall(r'<img[^>]*>', html)
    if img_tags:
        alt_attrs = [tag for tag in img_tags if 'alt=' in tag]
        if len(alt_attrs) == len(img_tags):
            score += 1
        else:
            issues.append("Images missing alt attributes")
    
    # Check for ARIA labels
    if 'aria-' in html or 'role=' in html:
        score += 1
    else:
        issues.append("No ARIA attributes found")
    
    # Check for color contrast classes
    contrast_classes = ['text-white', 'text-black', 'bg-gray', 'bg-slate']
    if any(cls in html for cls in contrast_classes):
        score += 1
    else:
        issues.append("No explicit contrast classes")
    
    return {
        'accessibility_score': min(score, 4),
        'issues': issues,
        'total_checks': 4
    }

# Test the scorer
example = {"prompt": "Create a button"}
prediction = {
    "html": '<button class="bg-blue-500 text-white" aria-label="Submit">Click me</button>'
}

result = accessibility_scorer(example, prediction)
print(f"Accessibility Score: {result}")`,
        
        running: `# Debug evaluation issues
import asyncio
import weave
from openui.eval.evaluate_weave import OpenUIModel, scoring_model

async def debug_evaluation():
    weave.init("openui-dev")
    
    # Test model prediction
    model = OpenUIModel(
        prompt_template="Create TailwindCSS components...",
        take_screenshot=False
    )
    
    try:
        print("🧪 Testing model prediction...")
        result = await model.predict("Create a red button")
        print(f"✅ Model output: {result}")
        
        print("\\n📏 Testing scorer...")
        score = await scoring_model.predict(
            "Create a red button", 
            result
        )
        print(f"✅ Score: {score}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        print("\\n🔧 Debug steps:")
        print("1. Check server logs: tail -f server.log")
        print("2. Verify API keys in .env")
        print("3. Ensure server is running: python -m openui --dev")

asyncio.run(debug_evaluation())`,
        
        advanced: `# Production evaluation pipeline
import asyncio
import weave
from datetime import datetime

class ProductionEvaluator:
    def __init__(self, project_name):
        weave.init(project_name)
        self.baseline_scores = None
        
    async def run_regression_test(self, models, threshold=0.1):
        """Run evaluations and check for regressions"""
        dataset = weave.ref("eval:v0").get()
        
        results = {}
        for model_name, model in models.items():
            print(f"🧪 Evaluating {model_name}...")
            
            evaluation = weave.Evaluation(
                dataset=dataset,
                scorers=[scores]
            )
            
            result = await evaluation.evaluate(model)
            results[model_name] = result
            
            # Check for regression
            if self.baseline_scores:
                current_avg = result['scores']['relevance']['mean']
                baseline_avg = self.baseline_scores['relevance']['mean']
                
                if current_avg < baseline_avg - threshold:
                    print(f"⚠️  REGRESSION DETECTED in {model_name}")
                    print(f"   Current: {current_avg:.2f}")
                    print(f"   Baseline: {baseline_avg:.2f}")
                    
        return results
    
    def set_baseline(self, scores):
        """Set baseline scores for regression detection"""
        self.baseline_scores = scores
        print(f"📊 Baseline set: {scores}")

# Usage
async def main():
    evaluator = ProductionEvaluator("openui-production")
    
    models = {
        "gpt-3.5": OpenUIModel(model_name="gpt-3.5-turbo"),
        "gpt-4": OpenUIModel(model_name="gpt-4-turbo")
    }
    
    results = await evaluator.run_regression_test(models)
    print(f"\\n📈 Evaluation complete: {datetime.now()}")

asyncio.run(main())`
    };
    
    editor.value = examples[section] || "# Example code not available";
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function runCode() {
    const output = document.getElementById('output');
    output.textContent = "🚀 Code execution simulated!\n\n✅ This would run your evaluation code\n💡 Copy this code to your project to try it for real";
}

function showDatasetExample() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# Example dataset structure for OpenUI
dataset = {
    "name": "eval",
    "version": "v0", 
    "rows": [
        {
            "prompt": "Create a simple button component",
            "name": "Button",
            "emoji": "🔘",
            "expected_elements": ["button"],
            "expected_classes": ["bg-", "text-", "px-", "py-"]
        },
        {
            "prompt": "Make a card component with header and content", 
            "name": "Card",
            "emoji": "🃏",
            "expected_elements": ["div"],
            "expected_classes": ["bg-card", "shadow", "rounded"]
        },
        {
            "prompt": "Build a navigation bar",
            "name": "Navigation", 
            "emoji": "🧭",
            "expected_elements": ["nav", "ul", "li", "a"],
            "expected_classes": ["flex", "space-x"]
        }
    ]
}

print(f"📊 Dataset: {dataset['name']}")
print(f"📝 Examples: {len(dataset['rows'])}")
for row in dataset['rows']:
    print(f"   • {row['emoji']} {row['name']}: {row['prompt']}")`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function showModelExample() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# OpenUI Model Architecture Deep Dive
class OpenUIModel(PromptModel):
    """
    A model that generates HTML components from text prompts
    """
    
    # Configuration
    prompt_template: str  # System prompt for LLM
    model_name: str = "gpt-3.5-turbo"  # LLM to use
    take_screenshot: bool = False  # Enable visual validation
    temp: float = 0.3  # Temperature for generation
    
    @weave.op()  # Weave tracking decorator
    async def predict(self, prompt: str) -> dict:
        """Main prediction pipeline"""
        
        # Step 1: Generate with LLM
        completion = await self.actually_predict(prompt)
        result = completion.choices[0].message.content
        
        # Step 2: Parse structured output
        parsed = self.extract_html(result)
        # Returns: {"name": "...", "emoji": "...", "html": "..."}
        
        # Step 3: Optional screenshots
        if self.take_screenshot:
            name = f"prompt-{self._iteration}"
            await self.screenshot(parsed["html"], name)
            parsed["desktop_img"] = f"./{name}.desktop.png"
            parsed["mobile_img"] = f"./{name}.mobile.png"
        
        return parsed
    
    def extract_html(self, result: str):
        """Parse LLM output into structured format"""
        # Handle frontmatter: ---\\nname: Button\\nemoji: 🔘\\n---
        # Extract HTML from markdown code blocks
        # Provide fallbacks for malformed output
        pass
    
    async def screenshot(self, html: str, name: str):
        """Generate visual validation screenshots"""
        # Use Playwright to render component
        # Capture desktop + mobile viewports
        # Light + dark mode variants
        pass

# Key benefits:
# ✅ Async for performance
# ✅ Configurable for different use cases  
# ✅ Robust error handling
# ✅ Optional features (screenshots)
# ✅ Full Weave integration`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function showScoringExample() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# Interactive Scoring Demo
# This simulates how OpenUI scores components

def score_component(prompt, html, has_screenshots=False):
    """Simulate the scoring process"""
    
    scores = {
        "relevance": 0,
        "polish": 0, 
        "media": 0,
        "contrast": 0,
        "reasoning": ""
    }
    
    # Relevance scoring
    if "button" in prompt.lower() and "<button" in html:
        scores["relevance"] = 4
        scores["reasoning"] += "Perfect relevance - clearly a button. "
    elif "card" in prompt.lower() and "div" in html:
        scores["relevance"] = 4
        scores["reasoning"] += "Perfect relevance - card structure present. "
    else:
        scores["relevance"] = 2
        scores["reasoning"] += "Partial relevance. "
    
    # Polish scoring (based on CSS classes)
    tailwind_classes = ["bg-", "text-", "px-", "py-", "rounded", "shadow"]
    class_count = sum(1 for cls in tailwind_classes if cls in html)
    scores["polish"] = min(4, class_count)
    scores["reasoning"] += f"Polish: {class_count} design classes used. "
    
    # Media scoring
    responsive_classes = ["sm:", "md:", "lg:", "max-w", "flex"]
    responsive_count = sum(1 for cls in responsive_classes if cls in html)
    scores["media"] = min(4, responsive_count + 2)  # Base score + responsive
    scores["reasoning"] += f"Media: {responsive_count} responsive features. "
    
    # Contrast scoring  
    theme_classes = ["bg-primary", "text-primary", "bg-secondary"]
    theme_count = sum(1 for cls in theme_classes if cls in html)
    scores["contrast"] = min(4, theme_count + 2)  # Base + theme support
    scores["reasoning"] += f"Contrast: {theme_count} theme-aware classes."
    
    return scores

# Test examples
examples = [
    {
        "prompt": "Create a simple button component",
        "html": '<button class="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/80">Click me</button>'
    },
    {
        "prompt": "Make a card component",
        "html": '<div class="bg-card shadow-lg rounded-lg p-4 max-w-md"><h2>Title</h2><p>Content</p></div>'
    }
]

print("🎯 Interactive Scoring Demo\\n")
for i, example in enumerate(examples, 1):
    print(f"Example {i}: {example['prompt']}")
    print(f"HTML: {example['html'][:60]}...")
    
    scores = score_component(example['prompt'], example['html'])
    print(f"Scores: {scores}")
    print(f"Reasoning: {scores['reasoning']}\\n")
    
print("💡 This is a simplified version of OpenUI's GPT-4 Vision scoring")`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function showRunExample() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# Interactive Evaluation Run Demo
import time
import random

def simulate_evaluation_run():
    """Simulate running an OpenUI evaluation"""
    
    print("🚀 Starting OpenUI Evaluation")
    print("=" * 50)
    
    # Simulate initialization
    print("📊 Initializing Weave...")
    time.sleep(0.5)
    print("✅ Connected to wandb.ai/your-entity/openui-dev")
    
    print("\\n📚 Loading dataset...")
    time.sleep(0.3)
    dataset_size = 3
    print(f"✅ Loaded 'eval:v0' with {dataset_size} examples")
    
    print("\\n🤖 Running model predictions...")
    
    examples = [
        "Create a simple button component",
        "Make a card component with header and content", 
        "Build a navigation bar"
    ]
    
    results = []
    
    for i, prompt in enumerate(examples, 1):
        print(f"\\n  {i}/{len(examples)} - {prompt}")
        
        # Simulate generation time
        gen_time = random.uniform(0.8, 2.0)
        time.sleep(gen_time)
        
        # Simulate model output
        components = ["Button", "Card", "Navigation"]
        emojis = ["⭐", "🃏", "🚀"]
        
        result = {
            "name": components[i-1],
            "emoji": emojis[i-1], 
            "html": f"<{['button', 'div', 'nav'][i-1]} class='...'></{'button' if i==1 else 'div' if i==2 else 'nav'}>",
            "generation_time": gen_time
        }
        
        results.append(result)
        print(f"    ✅ Generated: {result['name']} {result['emoji']}")
        
        # Simulate scoring
        print(f"    📏 Scoring...")
        time.sleep(0.5)
        
        scores = {
            "relevance": random.uniform(3.5, 4.0),
            "polish": random.uniform(2.8, 3.8),
            "media": random.uniform(2.5, 3.5),
            "contrast": random.uniform(2.8, 3.2)
        }
        
        result["scores"] = scores
        print(f"    📊 Scores: R:{scores['relevance']:.1f} P:{scores['polish']:.1f} M:{scores['media']:.1f} C:{scores['contrast']:.1f}")
    
    print("\\n" + "=" * 50)
    print("🎉 Evaluation Complete!")
    
    # Calculate averages
    avg_scores = {
        dimension: sum(r["scores"][dimension] for r in results) / len(results)
        for dimension in ["relevance", "polish", "media", "contrast"]
    }
    
    avg_latency = sum(r["generation_time"] for r in results) / len(results)
    
    print("\\n📈 Final Results:")
    print(f"  Relevance:  {avg_scores['relevance']:.2f}/4.0")
    print(f"  Polish:     {avg_scores['polish']:.2f}/4.0") 
    print(f"  Media:      {avg_scores['media']:.2f}/4.0")
    print(f"  Contrast:   {avg_scores['contrast']:.2f}/4.0")
    print(f"  Latency:    {avg_latency:.2f}s average")
    
    print("\\n🔗 View detailed results:")
    print("   https://wandb.ai/your-entity/openui-dev/weave")
    
    return results

# Run the simulation
results = simulate_evaluation_run()
print(f"\\n💡 Simulation complete! Generated {len(results)} examples.")`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function showAdvancedExample() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# Advanced Features Demo
import asyncio
import weave
from datetime import datetime, timedelta

class AdvancedEvaluationSystem:
    """Production-ready evaluation system with advanced features"""
    
    def __init__(self, project_name):
        weave.init(project_name)
        self.baseline_metrics = {}
        self.alert_thresholds = {
            "relevance": 3.5,
            "polish": 3.0,
            "latency": 2.0  # seconds
        }
    
    async def compare_models(self, models, dataset_ref="eval:v0"):
        """A/B test multiple models systematically"""
        dataset = weave.ref(dataset_ref).get()
        results = {}
        
        for name, model in models.items():
            print(f"🧪 Evaluating {name}...")
            
            evaluation = weave.Evaluation(
                dataset=dataset,
                scorers=[self.comprehensive_scorer]
            )
            
            result = await evaluation.evaluate(model)
            results[name] = result
            
            # Real-time monitoring
            self.check_for_regressions(name, result)
        
        return self.analyze_model_comparison(results)
    
    async def comprehensive_scorer(self, example, prediction):
        """Multi-dimensional scoring with advanced metrics"""
        base_scores = await self.basic_quality_scores(example, prediction)
        
        # Add performance metrics
        performance_scores = self.analyze_performance(prediction)
        
        # Add business metrics
        business_scores = self.calculate_business_impact(prediction)
        
        return {
            **base_scores,
            **performance_scores, 
            **business_scores,
            "timestamp": datetime.now().isoformat()
        }
    
    def analyze_performance(self, prediction):
        """Analyze technical performance metrics"""
        html = prediction.get('html', '')
        
        return {
            "code_quality": self.assess_code_quality(html),
            "accessibility": self.check_accessibility(html),
            "performance": self.estimate_render_performance(html),
            "maintainability": self.assess_maintainability(html)
        }
    
    def calculate_business_impact(self, prediction):
        """Calculate business-relevant metrics"""
        html = prediction.get('html', '')
        
        # Estimate conversion potential
        conversion_score = 3.0
        if any(word in html for word in ['button', 'click', 'submit']):
            conversion_score += 0.5
        if 'hover:' in html:  # Interactive elements
            conversion_score += 0.3
            
        # Estimate maintenance cost (simpler = cheaper)
        complexity = html.count('<') + html.count('class=')
        maintenance_score = max(1.0, 4.0 - (complexity / 10))
        
        return {
            "conversion_potential": min(4.0, conversion_score),
            "maintenance_cost": maintenance_score,
            "brand_consistency": self.check_brand_guidelines(html)
        }
    
    def check_for_regressions(self, model_name, results):
        """Real-time regression detection"""
        current_scores = results.get('scores', {})
        
        for metric, threshold in self.alert_thresholds.items():
            if metric in current_scores:
                current_value = current_scores[metric].get('mean', 0)
                
                if current_value < threshold:
                    self.send_alert(
                        f"🚨 REGRESSION ALERT: {model_name}",
                        f"{metric}: {current_value:.2f} < {threshold}"
                    )
    
    def send_alert(self, title, message):
        """Send alert (integrate with your monitoring system)"""
        print(f"\\n{title}")
        print(f"   {message}")
        print(f"   Time: {datetime.now()}")
        # In production: send to Slack, email, PagerDuty, etc.
    
    async def run_continuous_evaluation(self, model, interval_hours=6):
        """Run evaluations continuously for monitoring"""
        print(f"🔄 Starting continuous evaluation (every {interval_hours}h)")
        
        while True:
            try:
                print(f"\\n⏰ Running scheduled evaluation at {datetime.now()}")
                
                # Run evaluation
                dataset = weave.ref("eval:latest").get()
                evaluation = weave.Evaluation(
                    dataset=dataset,
                    scorers=[self.comprehensive_scorer]
                )
                
                results = await evaluation.evaluate(model)
                
                # Store results for trending
                self.store_historical_results(results)
                
                # Check for issues
                self.analyze_trends()
                
                print(f"✅ Evaluation complete. Next run in {interval_hours}h")
                
            except Exception as e:
                self.send_alert("❌ Evaluation Failed", str(e))
            
            # Wait for next interval
            await asyncio.sleep(interval_hours * 3600)

# Example usage
async def demo_advanced_features():
    system = AdvancedEvaluationSystem("openui-production")
    
    # Define models to compare
    models = {
        "gpt-3.5-fast": OpenUIModel(model_name="gpt-3.5-turbo", temp=0.1),
        "gpt-4-quality": OpenUIModel(model_name="gpt-4-turbo", temp=0.3),
        "claude-balanced": OpenUIModel(model_name="claude-3-sonnet", temp=0.2)
    }
    
    # Run A/B comparison
    comparison_results = await system.compare_models(models)
    print("\\n📊 Model Comparison Results:")
    print(comparison_results)
    
    # Start continuous monitoring (simulation)
    print("\\n🔄 Would start continuous monitoring in production...")

# Run demo
print("🚀 Advanced Evaluation Features Demo")
print("=" * 50)
asyncio.run(demo_advanced_features())`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function showTemplateCode() {
    const playground = document.getElementById('codePlayground');
    const editor = document.getElementById('codeEditor');
    
    editor.value = `# Weave Evaluation Template
# Adapt this template for your own AI application

import asyncio
import weave
from weave import Model, Dataset, Evaluation
from typing import Optional, Dict, Any

class YourCustomModel(Model):
    """Replace this with your AI application logic"""
    
    model_name: str = "gpt-3.5-turbo"
    temperature: float = 0.3
    
    @weave.op()
    async def predict(self, input_data: str) -> Dict[str, Any]:
        """
        Implement your model's prediction logic here
        
        Args:
            input_data: The input to your model
            
        Returns:
            Dictionary with your model's output
        """
        # TODO: Replace with your actual model logic
        
        # Example: Call your LLM/API/Model
        result = await self.call_your_model(input_data)
        
        # Example: Parse and structure the output
        structured_output = self.parse_output(result)
        
        return structured_output
    
    async def call_your_model(self, input_data: str):
        """Replace with your actual model call"""
        # Example for OpenAI:
        # from openai import AsyncOpenAI
        # client = AsyncOpenAI()
        # response = await client.chat.completions.create(...)
        # return response.choices[0].message.content
        
        return f"Mock output for: {input_data}"
    
    def parse_output(self, raw_output: str) -> Dict[str, Any]:
        """Parse your model's raw output into structured format"""
        return {
            "output": raw_output,
            "metadata": {
                "model": self.model_name,
                "timestamp": "2024-01-01T00:00:00Z"
            }
        }

@weave.op()
async def your_custom_scorer(example: Dict, prediction: Dict) -> Dict[str, float]:
    """
    Implement your scoring logic here
    
    Args:
        example: Input data from your dataset
        prediction: Output from your model
        
    Returns:
        Dictionary with scores (0-1 or 1-5 scale)
    """
    
    # Example scoring dimensions
    scores = {}
    
    # Quality score (0-1)
    scores["quality"] = assess_quality(prediction["output"])
    
    # Relevance score (0-1) 
    scores["relevance"] = assess_relevance(example, prediction)
    
    # Custom business metric
    scores["business_value"] = assess_business_value(prediction)
    
    return scores

def assess_quality(output: str) -> float:
    """Implement your quality assessment logic"""
    # Example: length-based quality (replace with your logic)
    return min(1.0, len(output) / 100)

def assess_relevance(example: Dict, prediction: Dict) -> float:
    """Implement relevance assessment"""
    # Example: keyword matching (replace with your logic)
    input_words = set(example.get("input", "").lower().split())
    output_words = set(prediction["output"].lower().split())
    
    if not input_words:
        return 0.0
        
    overlap = len(input_words.intersection(output_words))
    return overlap / len(input_words)

def assess_business_value(prediction: Dict) -> float:
    """Implement business-specific scoring"""
    # Example: placeholder for your business logic
    return 0.8  # Replace with actual assessment

async def create_your_dataset():
    """Create and publish your evaluation dataset"""
    
    # TODO: Replace with your actual data
    rows = [
        {"input": "Your test input 1", "expected_output": "Expected result 1"},
        {"input": "Your test input 2", "expected_output": "Expected result 2"},
        {"input": "Your test input 3", "expected_output": "Expected result 3"},
    ]
    
    dataset = Dataset(name="your_eval_dataset", rows=rows)
    weave.publish(dataset)
    
    return dataset

async def run_your_evaluation():
    """Main evaluation function"""
    
    # Initialize Weave
    weave.init("your-project-name")
    
    # Create or load dataset
    dataset = await create_your_dataset()
    # Or load existing: dataset = weave.ref("your_eval_dataset:v0").get()
    
    # Initialize your model
    model = YourCustomModel(
        model_name="gpt-3.5-turbo",
        temperature=0.3
    )
    
    # Create evaluation
    evaluation = Evaluation(
        dataset=dataset,
        scorers=[your_custom_scorer]
    )
    
    # Run evaluation
    print("🚀 Starting evaluation...")
    results = await evaluation.evaluate(model)
    
    print("✅ Evaluation complete!")
    print(f"📊 Results: {results}")
    
    return results

# Run your evaluation
if __name__ == "__main__":
    results = asyncio.run(run_your_evaluation())
    print(f"\\n🎉 Evaluation finished with results: {results}")
    
    # TODO: Add your result analysis logic
    # TODO: Add alerting/monitoring logic
    # TODO: Add CI/CD integration`;
    
    playground.style.display = 'block';
    playground.scrollIntoView({ behavior: 'smooth' });
}

function openLink(url) {
    window.open(url, '_blank');
}

function resetTutorial() {
    showSection(0);
    const playground = document.getElementById('codePlayground');
    playground.style.display = 'none';
}

function downloadSummary() {
    const summary = `
# Weave Evaluations Tutorial Summary

## Key Concepts
- **Models**: Your AI system (OpenUIModel in our example)
- **Datasets**: Test cases for evaluation (CSV → Weave Dataset)
- **Scorers**: Functions that assess quality (multi-dimensional scoring)

## Core Workflow
1. Create dataset: CSV → weave.Dataset → weave.publish()
2. Build model: Inherit from Model, implement predict()
3. Define scorers: Functions that return quality scores
4. Run evaluation: Evaluation(dataset, model, scorers)

## OpenUI Example Structure
\`\`\`python
# Model generates HTML from prompts
class OpenUIModel(PromptModel):
    async def predict(self, prompt: str) -> dict:
        # Generate HTML, parse output, optionally screenshot
        
# Scorer evaluates across 4 dimensions  
class OpenUIScoringModel(Model):
    async def predict(self, prompt: str, prediction: dict) -> dict:
        # Score relevance, polish, media, contrast (1-4 scale)
\`\`\`

## Running Evaluations
\`\`\`bash
# Basic (no screenshots)
python -m openui.eval.evaluate_weave

# With screenshots  
python -m openui.eval.evaluate_weave --screenshots

# Different model
python -m openui.eval.evaluate_weave gpt-4-turbo
\`\`\`

## Best Practices
- Start simple, iterate fast
- Automate early in development
- Use multi-dimensional scoring
- Monitor for regressions
- Version your datasets

## Advanced Features
- Prompt optimization (HOGWILD=1)
- A/B testing multiple models
- Continuous evaluation
- Custom metrics
- Production monitoring

## Resources
- OpenUI GitHub: https://github.com/wandb/openui
- Weave Docs: https://weave-docs.wandb.ai/
- W&B Community: https://wandb.ai/community
`;
    
    const blob = new Blob([summary], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weave-evaluations-summary.md';
    a.click();
    URL.revokeObjectURL(url);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSection(-1);
    } else if (e.key === 'ArrowRight') {
        changeSection(1);
    }
});