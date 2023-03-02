import { useEffect, useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// https://jsonplaceholder.typicode.com/comments
const App = () => {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((e) => {
      return {
        author: e.email,
        content: e.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        create_date: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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
};

export default App;
