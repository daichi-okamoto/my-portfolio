import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const projects = [
  {
    id: 1,
    title: 'Care Shift',
    description: 'シフト自動作成アプリの詳細説明です...',
    image: '/portfolio2.png',
    images: ['/pf-cs-top.jpg', '/pf-cs-staff1.png', '/pf-cs-shift.png'],
    details: {
      text: '前職の介護施設のシフト自動作成アプリを作成しました。従業員を登録し、勤務希望を入力します。その後シフト作成ボタンを押すと、1ヶ月分のシフトが一瞬で作成されます。作成したシフトの編集もできるようにしました。シフト計算にはPythonのPuLPを使用して自動計算を行なっています。',
      languages: 'Ruby on Rails, Ruby, Python, Tailwindcss, HTML/CSS, Postgresql, Git, GitHub, Docker, Heroku',
      githubLink: 'https://github.com/daichi-okamoto/my-app',
      websiteLink: 'https://care-shift.com/',
      siteTitle: 'Care Shift',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 2,
    title: 'ポートフォリオサイト',
    description: 'ポートフォリオサイトの詳細説明です...',
    image: '/pf1.png',
    images: ['/pf-pf.png', '/pf-pf1.png', '/pf-pf2.png'],
    details: {
      text: '個人のポートフォリオサイトを作成しました。フロントエンドの技術にも興味があり、Reactを使用してポートフォリオサイトを実装しました。TailwindCSSでデザインを行い、GitHubでソースコードを管理しています。Reactを使用することによって、ユーザーがスムーズにページを遷移できるため、ポートフォリオサイトのユーザー体験を向上させることができました。',
      languages: 'React, Framer Motion, React Slick, Tailwind CSS, Vercel, Git, GitHub',
      githubLink: 'https://github.com/daichi-okamoto/my-portfolio',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 3,
    title: 'ブログ',
    description: 'ブログの詳細説明です...',
    image: '/pf-blog1.png',
    images: ['/pf-blog.jpg', '/pf-blog-1.png', '/pf-blog-2.png'],
    details: {
      text: '個人ブログを作成しました。WordPressを使用してブログを作成し、HTML/CSSでデザインを行いました。ブログの記事は、日々の学習や開発の記録を残しています。サイトの見た目を整えることが好きだと思い始めました。WEBサイト制作にも挑戦してみたいです。',
      languages: 'WordPress, HTML/CSS, JavaScript, PHP',
      websiteLink: 'https://okapoohblog.com/',
      siteTitle: 'DAICHIBLOG'
    }
  },
  {
    id: 4,
    title: 'グラウンド予約システム',
    description: 'グラウンド予約システムの詳細説明です...',
    image: '/pf-ground.png',
    images: ['/pf-ground-reserve.png', '/pf-ground-reserve2.png', '/pf-ground-reserve3.png'],
    details: {
      text: '新しくできる人工芝のサッカーグランドの予約システムを開発しました。Ruby on Railsを使用して、予約システムを作成しました。ユーザーは、予約したい日時を選択し、予約を確定することができます。管理者は、予約の管理を行うことができます。将来的にはクレカ決済機能を追加する予定です。',
      languages: 'Ruby on Rails, Ruby, Tailwindcss, HTML/CSS, Postgresql, Git, GitHub, Docker',
      githubLink: 'https://github.com/daichi-okamoto/ground-reserve',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 5,
    title: 'ホームページ制作',
    description: '高森サッカークラブのホームページ制作の詳細説明です...',
    image: '/pf-takamori-sc.jpg',
    images: ['/pf-takamori.jpg', '/pf-takamori2.jpg', '/pf-takamori3.jpg'],
    details: {
      text: '高森サッカークラブのホームページを制作しました。作成期間も短く、とにかく費用がかからないように且つプロっぽいホームページにしたいとご要望があったためWordPressの無料テーマLightningを使用して、サイトの制作を行いました。チームエンブレムのデザインも行いました。無料テーマでも工夫と追加CSSで見た目よく仕上げることができたと思います。',
      languages: 'WordPress, Lightning, HTML/CSS, PHP',
      websiteLink: 'https://takamori-sc.site/',
      siteTitle: '高森サッカークラブ'
    }
  },
  {
    id: 6,
    title: 'ホームページ制作',
    description: '整理収納アドバイザーのホームページ制作の詳細説明です...',
    image: '/studio4.png',
    images: ['/studio1.jpg', '/studio2.jpg', '/studio3.jpg'],
    details: {
      text: '整理収納アドバイザーのホームページを制作しました。Studioを使用して、サイトの制作を行いました。ノーコードでWebサイトを作成できるため、費用を抑えることができます。愛知県岡崎市に住んでいる方はぜひご利用ください。Studioでもホームページを作成できますので費用を抑えてホームページを作成したい方もぜひご利用ください。',
      languages: 'Studio',
      websiteLink: 'https://kataduke-aya.studio.site/',
      siteTitle: '片付けあーやー'
    }
  },
  {
    id: 7,
    title: 'LP制作',
    description: '空き家を賃貸にするサービスのLPを制作しました...',
    image: '/onomichi-lp.png',
    images: ['/onomichi-lp1.jpg', '/onomichi-lp2.jpg', '/onomichi-lp3.jpg'],
    details: {
      text: '空き家を賃貸にするサービスのLPを制作しました。広島県の尾道、福山、三原で空き家を賃貸にするサービスを行っているそうです。家の周りの草刈り、遺品整理、家の改修から賃貸にするまでワンストップで行っていますので、気になった方はぜひご利用ください。LPはWordPressで作成しました。テーマは独自テーマを作成しました。',
      languages: 'WordPress, HTML/CSS, PHP, GitHub',
      websiteLink: 'https://www.lp.okomarigotokaiketsu.site/',
      siteTitle: '空き家を賃貸にするサービス',
      githubLink: 'https://github.com/daichi-okamoto/onomichi_lp',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
  {
    id: 8,
    title: 'ホームページ制作',
    description: 'アザリー飯田のホームページを制作しました...',
    image: '/azaleeiida1.png',
    images: ['/azaleeiida.jpg', '/azaleeiida2.jpg', '/azaleeiida3.jpg'],
    details: {
      text: 'サッカーチーム「アザリー飯田」の公式ホームページをリニューアルしました。元のサイトはページ数が多く情報が分散していたため、見やすさと分かりやすさを重視して構成を再設計。ヒアリング時点で「しっかり活動しているチームであることを伝えたい」との要望を受け、必要な情報を整理し、不要なページを統合することで、コンテンツをすっきりとまとめました。PC表示では左側に固定メニューを配置し、求めている情報に素早く辿り着ける設計を実現。試合情報や選手・スタッフ紹介など、ユーザーがよく閲覧するページへスムーズにアクセスできるよう工夫しました。ページ数が多かったため、デザインから実装、WordPressテーマの構築までに約3ヶ月をかけ、完成度の高いホームページに仕上げています。',
      languages: 'WordPress, HTML/CSS, Scss, JavaScript, PHP, GitHub',
      websiteLink: 'https://www.azaleeiida.com/',
      siteTitle: 'アザリー飯田',
      githubLink: 'https://github.com/daichi-okamoto/azalee_theme',
      githubTitle: 'Github',
      githubIcon: <FontAwesomeIcon icon={faGithub} />,
    }
  },
];

export const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};
