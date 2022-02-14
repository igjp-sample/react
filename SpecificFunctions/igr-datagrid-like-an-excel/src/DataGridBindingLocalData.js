import { useState, useEffect, useCallback, useReducer, useRef } from 'react';
import { IgrDataGridModule } from 'igniteui-react-grids';
import { IgrDataGrid } from 'igniteui-react-grids';
import { IgrTextColumn, IgrNumericColumn, IgrDateTimeColumn } from 'igniteui-react-grids';
import { IgrGridColumnOptionsModule, IgrGridCellPosition } from 'igniteui-react-grids';

IgrDataGridModule.register();
IgrGridColumnOptionsModule.register();

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

function DataGridBindingLocalData() {

    const [data, setData] = useState([]);
    const gridRef = useRef(null);

    const [formData, setFormData] = useReducer(formReducer, {});

    useEffect(() => {
        let lData = [
            { ID: 1, productName: "果汁100% オレンジ", UnitPrice: 120, Date: new Date() },
            { ID: 2, productName: "果汁100% グレープ", UnitPrice: 120, Date: new Date() },
            { ID: 3, productName: "果汁100% レモン", UnitPrice: 120, Date: new Date() },
            { ID: 4, productName: "果汁100% ピーチ", UnitPrice: 120, Date: new Date() },
            { ID: 5, productName: "コーヒーマイルド", UnitPrice: 320, Date: new Date() },
            { ID: 6, productName: "コーヒービター", UnitPrice: 320, Date: new Date() },
            { ID: 7, productName: "コーヒーミルク", UnitPrice: 340, Date: new Date() },
            { ID: 8, productName: "ピリピリ ビール", UnitPrice: 560, Date: new Date() },
            { ID: 9, productName: "オタル白ラベル", UnitPrice: 560, Date: new Date() },
            { ID: 10, productName: "バードワイン", UnitPrice: 780, Date: new Date() }
        ];
        setData(lData);

        document.addEventListener("keydown", ctrlFunction, false);
    }, []);

    const ctrlFunction = useCallback((event) => { // ctrlキー押下時の各種処理
        if (event.ctrlKey) {
            if (event.key == "c") {
                copyToClipboard();
            }
            if (event.key == "v") {
                event.preventDefault();
                pasteFromClipboard();
            }
            if (event.key == "z") {
                if (gridRef.current.canUndo) {
                    event.preventDefault();
                    gridRef.current.undo();
                }
            }
            if (event.key == "y") {
                if (gridRef.current.canRedo) {
                    event.preventDefault();
                    gridRef.current.redo();
                }
            }
        }
    }, []);

    const onCommitClick = () => {
        gridRef.current.commitEdits();
    }

    const handleSubmit = () => {
        const addDate = {
            ...formData,
            Date: new Date()
        }
        data.push(addDate);
        gridRef.current.notifyInsertItem()
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value,
        });
    }

    const copyToClipboard = () => {

        let copyText = '';

        //現在の選択セルを取得
        const cellRanges = gridRef.current.selectedCellRanges.toArray();
        if (cellRanges.length == 0) {
            return
        }

        // 範囲選択セルの行数ループ処理
        for (let i = cellRanges[0].startRow; i <= cellRanges[0].endRow; i++)
        {
            // 範囲選択セルの列数ループ処理
            for (let j = cellRanges[0].startColumn; j <= cellRanges[0].endColumn; j++)
            {
                // 該当セルの値取得および文字列連結
                let cellValue = gridRef.current.resolveCellValueFromPosition(i, j);
                copyText += cellValue;
                if (j != cellRanges[0].endColumn)
                {
                    copyText += "\t";
                }
            }
            copyText += "\n";
        }
        copyTextToClipboard(copyText);
    }

    const pasteFromClipboard = () => {
        navigator.clipboard.readText()
        .then(function(data) {
            const listedPastData = processData(data);

            //アクティブセルのインデックス取得
            let startingRowIndex = gridRef.current.activeCell.rowIndex;
            let startingColIndex = -1;

            for (let i = 0; i < gridRef.current.actualColumns.count; i++)
            {
                console.log(gridRef.current.actualColumns.toArray())
                const columnKey = gridRef.current.actualColumns.toArray()[i].props.field;
                if (columnKey == gridRef.current.activeCell.columnUniqueKey)
                {
                    startingColIndex = i;
                    break;
                }
            }
            if (startingColIndex == -1) return;

            // 貼り付け対象のカラム数と行数を設定
            let pasteRowCount = listedPastData.length;
            let pasteColumnCount = listedPastData[0].length;

            // 貼り付け対象の行数分ループで処理
            for (let rowIdx = 0; rowIdx < pasteRowCount; rowIdx++)
            {

                // グリッドにバインドしているデータアイテムの取得
                const item = gridRef.current.actualDataSource.getItemAtIndex(rowIdx + startingRowIndex);

                // 貼り付け対象の列数分ループで処理
                for (let colIdx = 0; colIdx < pasteColumnCount; colIdx++)
                {
                    let pasteValue = listedPastData[rowIdx][colIdx];
                    let column = gridRef.current.actualColumns.toArray()[colIdx + startingColIndex].props.field;
                    item[column] = pasteValue;
                }
                // グリッドのデータ更新
                gridRef.current.notifyClearItems();
            }

            return false;

        }, function(err) {
          console.error('Async: Could not get text from clipboard: ', err);
        });
    }

    const copyTextToClipboard = (text) => {
        navigator.clipboard.writeText(text)
        .then(function() {
          console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
    }

    const processData = (data) => {
        const pasteData = data.split("\n");

        let listedPastData = [];

        for (let i = 0; i < pasteData.length; i++)
        {
            if (pasteData[i].length > 0) {
                listedPastData.push(pasteData[i].split("\t"));
            }
        }

        return listedPastData;
    }

    return (
        <div className="container sample">
            <div className="newrow">
                <label>Add New Row</label>
                <input type="number" placeholder='ID' name='ID' onChange={handleChange} />
                <input type="text" placeholder='productName' name='productName' onChange={handleChange} />
                <input type="number" placeholder='UnitPrice' name='UnitPrice' onChange={handleChange} />
                <div className="options horizontal">
                    <button onClick={handleSubmit}>Add</button>
                </div>
            </div>
            <IgrDataGrid
                ref={gridRef}
                height="500px"
                width="80%"
                autoGenerateColumns="false"
                dataSource={data}
                activationMode="Cell"
                editModeClickAction="DoubleClick" // セルをダブルクリックで編集モードへ
                editMode="CellBatch" // 編集内容をクライアント側で一時保管
                enterBehaviorAfterEdit="MoveDown" // 編集後にエンターキーを押した際に下のセルにフォーカスを移動
                selectionMode="RangeCell" // 複数セル範囲の選択
                selectionBehavior="ModifierBased"
                isColumnOptionsEnabled="false"
                >
                <IgrNumericColumn field="ID" width="60"/>
                <IgrTextColumn field="productName" headerText="productName" width="*>160" />
                <IgrNumericColumn field="UnitPrice" width="*>150"/>
                <IgrDateTimeColumn field="Date" headerText="Date of Birth" width="*>170"/>
            </IgrDataGrid>
            <div className="options horizontal">
                <button onClick={onCommitClick}>Commit</button>
            </div>
        </div>
    );
}

export default DataGridBindingLocalData;