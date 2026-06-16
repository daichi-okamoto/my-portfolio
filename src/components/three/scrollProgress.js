// Heroのスクロール進捗(0..1)を3Dキャンバスと共有するための軽量ストア。
// Reactの再レンダリングを挟まず useFrame から直接読めるよう、ただのミュータブルオブジェクトにする。
export const scrollState = {
  hero: 0, // Heroセクション内のスクロール進捗 0..1
};
