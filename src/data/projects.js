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