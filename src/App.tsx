import { Sidebar } from "./components/Sidebar";
import { Content } from "./components/Content";
import style from "./App.module.sass";

export const App = () => <div className={style.app}>
    <Sidebar />
    <Content/>
</div>