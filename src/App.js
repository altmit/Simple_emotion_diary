import { useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const create_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      create_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((e) => e.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((e) => (e.id === targetId ? { ...e, content: newContent } : e))
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
