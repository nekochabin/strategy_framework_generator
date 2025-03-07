import React, { useState } from "react";
import "./styles.css";

const FRAMEWORK_MAPPING = {
  観光: [
    "3C分析",
    "STP分析",
    "ファネル分析",
    "ポーター5Forces",
    "SWOT分析",
    "顧客体験マップ",
  ],
  特産品: [
    "バリューチェーン分析",
    "製品ライフサイクル",
    "3C分析",
    "ポジショニング分析",
    "ブルーオーシャン戦略",
    "4P分析",
  ],
  移住: [
    "SWOT分析",
    "ペルソナ分析",
    "ビジネスモデルキャンバス",
    "4P分析",
    "ジョブ理論",
    "顧客体験マップ",
  ],
  IT人材: [
    "リーン・スタートアップ",
    "PDCA",
    "バリューチェーン分析",
    "イノベーション普及理論",
    "デザイン思考",
    "ギャップ分析",
  ],
  地域文化: [
    "ブルーオーシャン戦略",
    "価値創造",
    "ビジネスモデルキャンバス",
    "文化人類学的アプローチ",
    "ストーリーテリング分析",
    "PEST分析",
  ],
};

// 各フレームワークに必要な追加情報を定義
const FRAMEWORK_CONTEXT_MAPPING = {
  "3C分析": [
    {
      id: "customer",
      label: "現在のターゲット層や顧客はどのような人たちですか？",
      placeholder: "例: 30-40代の共働き家族、週末に日帰り旅行を楽しむ層",
      hint: "ターゲット顧客の年齢層、属性、行動パターンなどを考えてみましょう",
    },
    {
      id: "company",
      label: "あなたの地域・サービスの強みは何ですか？",
      placeholder: "例: 温泉、豊かな自然環境、伝統工芸、アクセスの良さ",
      hint: "他の地域と比較して誇れる点や特徴的な資源を挙げてみましょう",
    },
    {
      id: "competitor",
      label: "競合となる地域やサービスは何ですか？",
      placeholder: "例: 隣接する温泉地、類似のアウトドア観光地",
      hint: "類似のターゲット層に向けたサービスを提供している地域や事業者を考えてみましょう",
    },
  ],
  SWOT分析: [
    {
      id: "strengths",
      label: "地域の強み（Strengths）は何ですか？",
      placeholder: "例: 豊かな自然環境、歴史的建造物、特産品、交通の便",
      hint: "内部要因として地域が持つ優位性を考えてみましょう",
    },
    {
      id: "weaknesses",
      label: "地域の弱み（Weaknesses）は何ですか？",
      placeholder: "例: 知名度不足、人口減少、インフラ不足",
      hint: "内部要因として地域が抱える課題や不足点を考えてみましょう",
    },
    {
      id: "opportunities",
      label: "地域の機会（Opportunities）は何ですか？",
      placeholder: "例: テレワーク普及、インバウンド観光の回復",
      hint: "外部環境の変化による追い風やチャンスを考えてみましょう",
    },
    {
      id: "threats",
      label: "地域の脅威（Threats）は何ですか？",
      placeholder: "例: 少子高齢化の進行、競合地域の台頭",
      hint: "外部環境からの制約や将来的なリスクを考えてみましょう",
    },
  ],
  STP分析: [
    {
      id: "segmentation",
      label: "市場をどのようにセグメント分けできますか？",
      placeholder: "例: 年齢層、家族構成、趣味嗜好、居住地域",
      hint: "顧客市場をどのような特徴で分けられるか考えてみましょう",
    },
    {
      id: "targeting",
      label: "特にターゲットにしたい層はどこですか？",
      placeholder: "例: 都市部在住の30代子育て世代、アウトドア好きの若年層",
      hint: "最も効果的にアプローチできる顧客層を考えてみましょう",
    },
    {
      id: "positioning",
      label: "他地域と比較してどのようなポジションを取りたいですか？",
      placeholder:
        "例: 「本物の田舎体験ができる場所」「アクセスの良い自然リゾート」",
      hint: "ターゲット顧客の心の中でどのように認識されたいかを考えてみましょう",
    },
  ],
  ビジネスモデルキャンバス: [
    {
      id: "value_proposition",
      label: "提供する価値（Value Proposition）は何ですか？",
      placeholder:
        "例: 「都会では味わえない自然との触れ合い」「伝統文化の体験」",
      hint: "顧客の問題を解決し、ニーズを満たす価値は何かを考えてみましょう",
    },
    {
      id: "key_partners",
      label: "重要なパートナーは誰ですか？",
      placeholder: "例: 地元事業者、交通機関、観光協会、自治体",
      hint: "事業を成功させるために協力が必要な関係者を考えてみましょう",
    },
    {
      id: "revenue_streams",
      label: "収益の流れはどのようになりますか？",
      placeholder: "例: 宿泊料、体験料、物産販売、会員費",
      hint: "どのようにして収益を得るのかのモデルを考えてみましょう",
    },
  ],
  ファネル分析: [
    {
      id: "awareness",
      label: "認知段階の現状と課題は？",
      placeholder: "例: SNSでの露出が少ない、地域名の認知度が低い",
      hint: "顧客があなたの地域やサービスを知る段階での状況を考えてみましょう",
    },
    {
      id: "interest",
      label: "興味段階の現状と課題は？",
      placeholder: "例: Webサイトへの訪問は多いが滞在時間が短い",
      hint: "顧客が興味を持った後の行動や反応について考えてみましょう",
    },
    {
      id: "conversion",
      label: "決定・行動段階の現状と課題は？",
      placeholder: "例: 予約の完了率が低い、直前キャンセルが多い",
      hint: "実際の予約や購入などの行動に至るまでの状況を考えてみましょう",
    },
    {
      id: "loyalty",
      label: "再訪・リピート段階の現状と課題は？",
      placeholder: "例: 一度の訪問で終わるケースが多い、口コミが少ない",
      hint: "顧客がリピーターになる割合や紹介行動について考えてみましょう",
    },
  ],
  "4P分析": [
    {
      id: "product",
      label: "提供する製品・サービス（Product）の特徴は？",
      placeholder: "例: 農業体験、特産品、自然観光ツアー",
      hint: "顧客に提供する製品やサービスの内容と特長を考えてみましょう",
    },
    {
      id: "price",
      label: "価格設定（Price）の考え方は？",
      placeholder: "例: 高付加価値・プレミアム価格、リーズナブルな価格帯",
      hint: "価格設定のポリシーや競合との比較について考えてみましょう",
    },
    {
      id: "place",
      label: "流通・場所（Place）の特徴は？",
      placeholder: "例: オンラインショップ、実店舗、イベント出店",
      hint: "どのような経路で顧客に届けるかを考えてみましょう",
    },
    {
      id: "promotion",
      label: "プロモーション（Promotion）の方法は？",
      placeholder: "例: SNS広告、観光誌への掲載、口コミ促進",
      hint: "どのように顧客に知ってもらい、興味を持ってもらうかを考えてみましょう",
    },
  ],
};

// デフォルトの質問項目（他のフレームワーク用）
const DEFAULT_CONTEXT_QUESTIONS = [
  {
    id: "current_situation",
    label: "現状の状況を教えてください",
    placeholder: "例: 観光客数の減少、特産品の売上低迷など",
    hint: "現在直面している課題や状況について具体的に書いてみましょう",
  },
  {
    id: "target_outcome",
    label: "達成したい成果は何ですか？",
    placeholder: "例: 観光客数20%増加、移住者年間50人増加など",
    hint: "数値目標があれば、より具体的なアドバイスが得られます",
  },
  {
    id: "resources",
    label: "活用できるリソースはありますか？",
    placeholder: "例: 予算300万円、地域住民ボランティア、空き家など",
    hint: "人的・物的・財政的リソースについて考えてみましょう",
  },
];

export default function App() {
  const [userGoal, setUserGoal] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showContextForm, setShowContextForm] = useState(false);
  const [contextInputs, setContextInputs] = useState({});
  const [currentStep, setCurrentStep] = useState(1); // 1: 課題入力, 2: コンテキスト入力, 3: 結果表示

  const selectCategory = (category) => {
    setSelectedCategory(category);
    // カテゴリ変更時はコンテキスト入力をリセット
    setContextInputs({});
    setShowContextForm(false);
    setCurrentStep(1);
  };

  const selectFrameworks = () => {
    // カテゴリが選択されている場合
    if (selectedCategory) {
      const categoryFrameworks = FRAMEWORK_MAPPING[selectedCategory];
      const shuffled = [...categoryFrameworks].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }

    // カテゴリが選択されていない場合、入力テキストから推測
    const matchedCategory = Object.keys(FRAMEWORK_MAPPING).find((category) =>
      userGoal.includes(category)
    );

    if (matchedCategory) {
      const categoryFrameworks = FRAMEWORK_MAPPING[matchedCategory];
      const shuffled = [...categoryFrameworks].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 3);
    }

    // デフォルトのフレームワーク
    return ["3C分析", "SWOT分析", "ビジネスモデルキャンバス"];
  };

  const prepareContextForm = () => {
    if (!userGoal.trim()) {
      alert("課題や目標を入力してください");
      return;
    }

    const frameworks = selectFrameworks();
    setSelectedFrameworks(frameworks);
    setShowContextForm(true);
    setCurrentStep(2);

    // 入力フォームの初期化
    const initialContext = {};
    frameworks.forEach((framework) => {
      const contextQuestions =
        FRAMEWORK_CONTEXT_MAPPING[framework] || DEFAULT_CONTEXT_QUESTIONS;
      contextQuestions.forEach((question) => {
        initialContext[`${framework}_${question.id}`] = "";
      });
    });
    setContextInputs(initialContext);
  };

  const handleContextChange = (framework, questionId, value) => {
    setContextInputs({
      ...contextInputs,
      [`${framework}_${questionId}`]: value,
    });
  };

  const generatePrompt = () => {
    setIsLoading(true);

    // ローディングの演出
    setTimeout(() => {
      const frameworks = selectedFrameworks;

      // コンテキスト情報を整形
      const contextBlocks = frameworks
        .map((framework) => {
          const questions =
            FRAMEWORK_CONTEXT_MAPPING[framework] || DEFAULT_CONTEXT_QUESTIONS;
          const contextInfo = questions
            .map((question) => {
              const value = contextInputs[`${framework}_${question.id}`];
              if (value) {
                return `- ${question.label.replace(/[？\?]$/, "")}: ${value}`;
              }
              return null;
            })
            .filter((item) => item !== null)
            .join("\n");

          return contextInfo
            ? `【${framework}の追加コンテキスト】\n${contextInfo}\n`
            : "";
        })
        .join("\n");

      const prompt = `あなたは地方創生の専門家です。  
次の課題に対し、**${frameworks.join(" + ")}**を活用して戦略を考えてください。  

【課題】  
${userGoal}  

${contextBlocks}

【分析の視点】  
${frameworks
  .map((framework, index) => {
    if (framework === "3C分析") {
      return `
${index + 1}. **${framework}**（顧客・自社・競合）
- 顧客（ターゲット）はどんな層が適しているか？
- 自社（地域の強み）は何か？
- 競合（他の地域・サービス）との差別化ポイントは？`;
    } else if (framework === "STP分析") {
      return `
${
  index + 1
}. **${framework}**（セグメンテーション・ターゲティング・ポジショニング）
- どんなニーズセグメントがありそうか？
- どのターゲット層にアプローチするべきか？
- 地域・サービスのポジショニングをどう設定するか？`;
    } else if (framework === "ファネル分析") {
      return `
${index + 1}. **${framework}**（認知 → 興味 → 決定 → 行動 → リピート）
- ユーザーの流れを可視化し、どこで離脱が起きているか？
- 認知度を高める施策は？
- 行動やリピート率を上げるための施策は？`;
    } else {
      return `
${index + 1}. **${framework}**
- このフレームワークから導き出せる重要な洞察は？
- 具体的にどのような戦略が考えられますか？`;
    }
  })
  .join("\n")}

最終的に、実行可能な具体的なアクションプランを提示してください。`;

      setGeneratedPrompt(prompt);
      setIsLoading(false);
      setCurrentStep(3);
    }, 500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const resetForm = () => {
    setSelectedFrameworks([]);
    setShowContextForm(false);
    setContextInputs({});
    setGeneratedPrompt("");
    setCurrentStep(1);
  };

  // フレームワークごとの追加コンテキストフォームをレンダリング
  const renderContextForm = () => {
    return (
      <div className="context-form">
        <h2>戦略フレームワークのコンテキスト情報</h2>
        <p className="info-text">
          選択されたフレームワークに関する追加情報を入力すると、より具体的な戦略提案が得られます。
        </p>

        {selectedFrameworks.map((framework) => {
          const questions =
            FRAMEWORK_CONTEXT_MAPPING[framework] || DEFAULT_CONTEXT_QUESTIONS;

          return (
            <div key={framework} className="framework-context-section">
              <h3>{framework}に関する情報</h3>

              {questions.map((question) => (
                <div key={question.id} className="context-input-group">
                  <label>{question.label}</label>
                  <input
                    type="text"
                    value={contextInputs[`${framework}_${question.id}`] || ""}
                    onChange={(e) =>
                      handleContextChange(
                        framework,
                        question.id,
                        e.target.value
                      )
                    }
                    placeholder={question.placeholder}
                    className="context-input"
                  />
                  {question.hint && (
                    <p className="input-hint">{question.hint}</p>
                  )}
                </div>
              ))}
            </div>
          );
        })}

        <div className="button-group">
          <button onClick={resetForm} className="back-button">
            戻る
          </button>
          <button
            onClick={generatePrompt}
            className="generate-button"
            disabled={isLoading}
          >
            {isLoading ? "生成中..." : "プロンプトを生成"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>戦略フレームワーク自動生成ツール</h1>
          <p className="subtitle">
            ビジネス課題を入力してAIに最適な戦略フレームワークを選ばせましょう
          </p>
        </div>

        <div className="card">
          {currentStep === 1 && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  placeholder="やりたいことや解決したい課題を入力 (例: 地域の観光客を増やしたい)"
                  className="input-field"
                />
              </div>

              <div className="category-section">
                <p>カテゴリを選択（任意）:</p>
                <div className="category-buttons">
                  {Object.keys(FRAMEWORK_MAPPING).map((category) => (
                    <button
                      key={category}
                      onClick={() => selectCategory(category)}
                      className={`category-button ${
                        selectedCategory === category ? "active" : ""
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={prepareContextForm} className="generate-button">
                次へ: フレームワークを選択
              </button>
            </>
          )}

          {currentStep === 2 && showContextForm && renderContextForm()}

          {currentStep === 3 && generatedPrompt && (
            <div className="result-section">
              <h2>選択されたフレームワーク</h2>
              <div className="framework-tags">
                {selectedFrameworks.map((framework) => (
                  <span key={framework} className="framework-tag">
                    {framework}
                  </span>
                ))}
              </div>

              <div className="prompt-section">
                <h2>生成されたプロンプト</h2>
                <div className="prompt-container">
                  <pre className="prompt-text">{generatedPrompt}</pre>
                </div>
                <div className="button-group">
                  <button onClick={resetForm} className="back-button">
                    新しいプロンプトを作成
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className={`copy-button ${copySuccess ? "success" : ""}`}
                  >
                    {copySuccess
                      ? "コピーしました！"
                      : "クリップボードにコピー"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="footer">
          <p>© 2025 地方創生をAIの力で | Terakoya HoRo</p>
        </footer>
      </div>
    </div>
  );
}
