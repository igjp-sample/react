import React, { MouseEvent, useState } from "react";
import "./App.css";
import {
  IgrDataGrid,
  IgrDataGridModule,
  IgrTemplateCellInfo,
  IgrTemplateColumn,
  IgrTextColumn,
} from "igniteui-react-grids";

IgrDataGridModule.register();

function App() {
  const [isShown, setIsShown] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0, t: ""});

  const data = [
    { id: 1, name: "name 1", template: "template cell 1" },
    { id: 2, name: "name 2", template: "template cell 2" },
    { id: 3, name: "name 3", template: "template cell 3" },
    { id: 4, name: "name 4", template: "template cell 4" },
    { id: 5, name: "name 5", template: "template cell 5" },
  ];

  function calculateTooltipPosition(data: IgrTemplateCellInfo, display: boolean) {
    if (data) {
      //let rect = (e.nativeEvent.target as any).getBoundingClientRect();
      setTooltipPosition({x: data.x, y: data.y, t: data.value});
    }

    setIsShown(display);
  }

  function customControl(args: any) {
    //debugger;
    return (
      <div
        //onMouseOver={(e) => calculateTooltipPosition(e, true, args.dataContext.value)}
        //onMouseOut={(e) => calculateTooltipPosition(e, false, args.dataContext.value)}
        onMouseEnter={(e) => calculateTooltipPosition(args.dataContext, true)}
        onMouseLeave={(e) => calculateTooltipPosition(args.dataContext, false)}
      >
        <div>{args.dataContext.value.substr(0,4)}...</div>
      </div>
    );
  }

  return (
    <div style={{ height: "500px", width: "500px", margin: "1rem", position: "relative" }}>
      <IgrDataGrid dataSource={data} autoGenerateColumns="false">
        <IgrTextColumn field="id" headerText="ID 列"></IgrTextColumn>
        <IgrTextColumn field="name" headerText="名前列"></IgrTextColumn>
        <IgrTemplateColumn
          field="template"
          headerText="テンプレート列"
          template={customControl}
        ></IgrTemplateColumn>
      </IgrDataGrid>

      {isShown && (
          <div
            style={{
              border: "1px solid red",
              padding: "2px 4px",
              background: "white",
              position: "absolute",
              top: tooltipPosition.y + 8 + "px",
              left: tooltipPosition.x + 180 + "px",
              zIndex: "2147483647",
              width: "200px"
            }}
          >
            {tooltipPosition.t}
          </div>
        )}
    </div>
  );
}

export default App;
