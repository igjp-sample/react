import React, { useRef } from "react";
import "./App.css";
import {
  IgrDataGrid,
  IgrDataGridModule,
  IgrTemplateCellInfo,
  IgrTemplateHeader,
  IgrTemplateCellUpdatingEventArgs,
  IgrTemplateHeaderCellUpdatingEventArgs,
  IgrTemplateColumn,
  IgrTextColumn,
  TemplateHeader,
  IgrGridSelectedKeysChangedEventArgs,
  IgrGridActiveCellChangedEventArgs,
  IgrGridSelectedItemsCollection,
} from "igniteui-react-grids";

IgrDataGridModule.register();

function App() {

  const gridRef = useRef<any>(null);
  let selectedItems = new IgrGridSelectedItemsCollection();

  const customHeader: IgrTemplateHeader = new IgrTemplateHeader({});
  customHeader.cellUpdating  = (s, e) => onCustomHeaderUpdating(s, e);

  let data: { id: number; name: string; checked: boolean }[] = [];
  for(let i = 0; i < 30; i++){
    data.push({ id: i, name: `name ${i.toString()}`, checked: false });
  }

  function onCheckboxCellUpdating(s: IgrTemplateColumn, e: IgrTemplateCellUpdatingEventArgs) {
    const content = e.content as HTMLDivElement;
      let check: HTMLInputElement | null = null;
      const info = e.cellInfo as IgrTemplateCellInfo ;
      const item = info.rowItem;
      if (content.childElementCount === 0) {
        check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.addEventListener("change", (evt) => {
          const newValue = (evt.target as HTMLInputElement).checked;
          const itemToUpdate = (e.cellInfo as IgrTemplateCellInfo).rowItem;
          let itemIndex = (gridRef.current as IgrDataGrid).actualDataSource.indexOfItem(itemToUpdate);
          itemToUpdate.checked = newValue;
          if(newValue)
          {
            (gridRef.current as IgrDataGrid).selectedItems.add(itemToUpdate);
          }
          else
          {
            (gridRef.current as IgrDataGrid).selectedItems.remove(itemToUpdate);
          }
          selectedItems = (gridRef.current as IgrDataGrid).selectedItems;
        });
        content.appendChild(check);
      }
      else {
        check = content.children[0] as HTMLInputElement;
      }
      if (check) {
        check.checked = item.checked;
      }
  }

  function onCustomHeaderUpdating(sender: IgrTemplateHeader, args: IgrTemplateHeaderCellUpdatingEventArgs): void{
    const content = args.content as HTMLDivElement;
      let checkAll: HTMLInputElement | null = null;
      if (content.childElementCount === 0) {
        checkAll = document.createElement('input');
        checkAll.setAttribute('type', 'checkbox');
        content.appendChild(checkAll);
        checkAll.addEventListener("change", (e) => {
          const newValue = (e.target as HTMLInputElement).checked;
          data.forEach(element => {
            element.checked = newValue;
            let itemIndex = data.indexOf(element);
            if(newValue)
            {
              if(!(gridRef.current as IgrDataGrid).selectedItems.contains(element))
              {
                (gridRef.current as IgrDataGrid).selectedItems.add(element);
              }
            }
            else
            {
              (gridRef.current as IgrDataGrid).selectedItems.remove(element);
            }
          });
        });
        checkAll.addEventListener("pointerdown", (e) => {
          e.stopPropagation();
        });
        if(content.parentElement != null)
        {
          content.parentElement.style.pointerEvents = "none";
        }
        checkAll.style.pointerEvents = "auto";
      }
  }

  function onActiveCellChanged(s: IgrDataGrid, e: IgrGridActiveCellChangedEventArgs): void{
    (gridRef.current as IgrDataGrid).selectedItems = selectedItems;
    setTimeout(() => {
      (gridRef.current as IgrDataGrid).selectedItems = selectedItems;
    }, 10);
  }

  return (
    <div style={{ margin: "30px" }}>
      <IgrDataGrid ref={gridRef} dataSource={data} autoGenerateColumns="false" activeCellChanged={onActiveCellChanged}>
        <IgrTemplateColumn field="checked" isEditable="false" width="50" header={customHeader} cellUpdating={onCheckboxCellUpdating} />
        <IgrTextColumn field="id" headerText="ID 列"></IgrTextColumn>
        <IgrTextColumn field="name" headerText="名前列"></IgrTextColumn>
      </IgrDataGrid>
    </div>
  );
}

export default App;
