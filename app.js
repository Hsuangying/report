const batchData = {
  "BAT-A12": [
    ["批次資料", "BAT-A12｜生產日期：2024-05-18｜產線：FILL-LINE-03"],
    ["設備紀錄", "14:32 發生溫度異常，Sensor Value：87.3°C"],
    ["品質檢驗", "抽檢結果：正常，但建議提高追蹤等級"],
    ["維修紀錄", "冷卻風扇異常，已通知主管安排檢查"]
  ],
  "BAT-A10": [
    ["批次資料", "BAT-A10｜生產日期：2024-05-16｜產線：SEAL-UNIT-02"],
    ["設備紀錄", "封蓋壓力波動，警示等級：Medium"],
    ["品質檢驗", "發現封口異常，進行複檢"],
    ["處理狀態", "已完成複檢，維持追蹤"]
  ]
};

function lookupBatch(){
  const id = document.getElementById("batchInput").value.trim() || "BAT-A12";
  const result = document.getElementById("threadResult");
  const data = batchData[id] || [
    ["查無資料", `系統目前沒有 ${id} 的完整履歷，可建立新批次紀錄。`]
  ];
  result.innerHTML = data.map(([title, text]) => `<div><strong>${title}</strong><br><span>${text}</span></div>`).join("");
}
lookupBatch();

function askAI(){
  const q = document.getElementById("question").value.trim();
  if(!q) return;
  const box = document.getElementById("chatBox");
  box.innerHTML += `<div class="msg user">${q}</div>`;
  let ans = "";
  if(q.includes("哪台") || q.includes("風險")){
    ans = "目前風險最高設備為 FILL-LINE-03。原因是振動值連續 7 天上升，且今日出現高溫異常，建議本週安排預防性檢查。";
  }else if(q.includes("BAT-A12") || q.includes("批次")){
    ans = "BAT-A12 關聯到 FILL-LINE-03 的溫度異常事件 EVT-0042。目前品質抽檢正常，但建議提高追蹤等級並確認冷卻風扇狀態。";
  }else if(q.includes("維修")){
    ans = "建議優先處理 FILL-LINE-03，其次為 MIX-TANK-01。系統可依風險分數自動產生維修工單。";
  }else{
    ans = "根據目前資料，建議先查看異常事件、設備風險排序與批次履歷，確認是否需要開立維修工單。";
  }
  box.innerHTML += `<div class="msg ai">${ans}</div>`;
  document.getElementById("question").value = "";
  box.scrollTop = box.scrollHeight;
}


function simulateAlert(){
  document.getElementById("eventCount").textContent = "4 件";
  document.getElementById("riskMachine").textContent = "2 台";
  const table = document.getElementById("eventTable");
  const row = document.createElement("tr");
  row.innerHTML = `<td>EVT-0043</td><td>振動持續上升</td><td>FILL-LINE-03</td><td>BAT-A13</td><td><span class="badge danger">HIGH</span></td><td>已產生工單</td>`;
  table.prepend(row);
  alert("已模擬新增異常事件：FILL-LINE-03 振動持續上升，系統已產生工單建議。");
}