import PageBuilder from "../PageBuilder/PageBuilder";

export default function Home() {
  // Keep State in the future & use cookies
  const theme = 'dark';
  return(
    <PageBuilder themeMode={theme}/>
  );
}