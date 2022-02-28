import React from "react";
import "./App.css";
import {
  IgrDataGrid,
  IgrDataGridModule,
  IgrTemplateCellInfo,
  IgrTemplateCellUpdatingEventArgs,
  IgrTemplateColumn,
  IgrTextColumn,
} from "igniteui-react-grids";

IgrDataGridModule.register();

function App() {
  let data = [];
  for(let i = 0; i < 30; i++){
    data.push({ id: i, name: `name ${i.toString()}` });
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div style={{ height: "50%", width: "100%", background: "#aaa" }}></div>
      <div style={{ height: "50%", width: "100%" }}>
        <IgrDataGrid dataSource={data} autoGenerateColumns="false" height="100%">
          <IgrTextColumn field="id" headerText="ID 列"></IgrTextColumn>
          <IgrTextColumn field="name" headerText="名前列"></IgrTextColumn>
        </IgrDataGrid>
      </div>
    </div>
  );
}

export default App;
