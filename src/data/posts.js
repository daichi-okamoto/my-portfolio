// microCMS(blog)未接続時のフォールバック用サンプル記事（プレーンなデータのみ）
// content は HTML 文字列（microCMSのリッチエディタもHTMLで返る想定）
export const posts = [
  {
    id: 'renewal-nextjs-microcms',
    title: 'ポートフォリオサイトを Next.js と microCMS でリニューアルしました',
    date: '2026-06-17',
    excerpt:
      'Create React App から Next.js (App Router) へ移行し、3D表現や実績のCMS管理を取り入れました。制作の意図と技術選定の記録です。',
    thumbnail: '/pf-pf.png',
    content: `
      <p>これまで Create React App で作っていたポートフォリオサイトを、Next.js (App Router) へ全面的に作り替えました。あわせて、温かみのある世界観・3D表現・実績のCMS管理を取り入れています。</p>
      <h2>なぜ作り替えたか</h2>
      <p>「作り込まれた世界観」と「実績を簡単に更新できる仕組み」を両立したく、SSR/SSG・画像最適化・ヘッドレスCMS連携に強い Next.js を基盤に選びました。</p>
      <h2>主な技術</h2>
      <p>Next.js / React Three Fiber（3D）/ Framer Motion（モーション）/ microCMS（実績・ブログ）/ Tailwind CSS / Vercel。</p>
      <p>これからも少しずつ改善していきます。</p>
    `,
  },
  {
    id: 'three-fiber-hero',
    title: 'React Three Fiber でスクロール連動の3Dヒーローをつくる',
    date: '2026-06-10',
    excerpt:
      'スクロールで形が変化する半透明オブジェクトの作り方。モーフターゲットとノイズで有機的な表現に。',
    thumbnail: '/portfolio2.png',
    content: `
      <p>トップのヒーローにある、スクロールで形が変わる3Dオブジェクトについての記録です。</p>
      <h2>モーフターゲットで形を変える</h2>
      <p>同じ頂点数の複数形状を用意し、スクロール量に応じて morphTargetInfluences をクロスフェードしています。さらにノイズで頂点を歪ませ、規則的になりすぎないようにしました。</p>
      <h2>軽さとのバランス</h2>
      <p>ワイヤーフレームの密度と透明度を調整し、密度感と表示速度の両立を狙いました。</p>
    `,
  },
  {
    id: 'efficiency-mindset',
    title: '介護現場からエンジニアへ — 「効率化」という原体験',
    date: '2026-05-28',
    excerpt:
      '前職の介護現場で感じた「効率化」の重要性が、いまのものづくりの軸になっています。',
    thumbnail: '/pf-cs-top.jpg',
    content: `
      <p>新卒で介護施設に入職し、4年間現場で働きました。限られた時間とリソースの中で質の高いケアをどう実現するか——その問いが、プログラミングを学ぶきっかけになりました。</p>
      <h2>シフト自動作成アプリ</h2>
      <p>手作業だったシフト作成を自動化し、作成時間を半分以下に短縮。現在も現場で使われています。</p>
      <p>これからも、現場の課題から仕組みを設計するエンジニアでありたいと思っています。</p>
    `,
  },
];
