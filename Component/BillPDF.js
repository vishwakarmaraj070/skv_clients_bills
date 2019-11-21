export const generateBillPDF = client => {
  console.log(client);
  return `<body>
    <div
      style="max-width: 700px; margin: 0; padding: 20px; background-color: lightblue"
    >
      <div style="display: flex; justify-content: space-between;">
        <div style="width: 50%; text-align: left;">
          <h3 style="color: #1976d2;margin: 0;">Skv</h3>
          <p style="margin: 0; font-size: 14px;">9793939227</p>
          <p style="margin: 0; font-size: 14px;">Karve Nagar, Pune</p>
        </div>
        <div style="width: 50%; text-align: right; font-size: 14px;">
          Date : ${client.date}
        </div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div></div>
        <div>
          <p style="margin: 0; font-size: 14px;">Bill To</p>
          <h3 style="color: #1976d2;margin: 0; text-transform: capitalize;">${
            client.name
          }</h3>
          <p style="margin: 0; font-size: 14px;">${client.mobile}</p>
        </div>
      </div>

      <h3
        style="color: #1976d2;margin: 0; text-align: center; margin-bottom: 4px;"
      >
        Items Discription
      </h3>
      <div>
        <div>
          <div style="display: flex; justify-content: space-between; text-transform: uppercase; line-height: 2; border-bottom: 1px solid steelblue; ">
            <div style="width: 50%; text-align: left;">
              <h6 style="margin: 0;">Item Discription</h6>
            </div>
            <div style="width: 50%; text-align: right; display: flex; justify-content: space-between;">
              <h6 style="margin: 0;  width: 30%;">Rate</h6>
              <h6 style="margin: 0;  width: 30%">Area</h6>
              <h6 style="margin: 0;  width: 40%">Total</h6>
            </div>
          </div>
          ${client.items.map(
            (item, index) =>
              `<div
            style="font-size: 14px; display: flex; justify-content: space-between; align-items: center; text-transform: capitalize; padding: 5px 0; line-height: 1.2; border-bottom: 1px solid steelblue; ">
            <div style="width: 50%; text-align: left;">
              <p style="margin: 0; line-height: 1.2;">${item.item}</p>
            </div>
            <div style="width: 50%; text-align: right; display: flex; justify-content: space-between;">
              <p style="margin: 0;  width: 30%">${item.rate}</p>
              <p style="margin: 0;  width: 30%">${item.area}</p>
              <p style="margin: 0;  width: 40%">${item.total}</p>
            </div>
          </div>`,
          )}

          <div style="display: flex; justify-content: space-between; align-items: center; line-height: 2; border-bottom: 1px solid steelblue;">
            <div style="width: 50%; text-align: left;">
              <p style="margin: 0;  font-size: 12px;">Your Payable Amount is : </p>
            </div>
            <div style="width: 50%; text-align: right;">
              <h5 style="margin: 0;">Amount : ${client.grand}</h5>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; align-items: center;padding: 5px 0; line-height: 1.2; border-bottom: 1px solid steelblue;">
            <div style="width: 60%; text-align: left;">
              <p style="margin: 0;  font-size: 12px;">Thanks for showing interest with us! Hope we gave you a best server</p>
              <p style="margin: 0;  font-size: 12px; text-align: center; padding: 5px; background-color: lightskyblue; margin-top: 3px;">Thank You</p>
            </div>
            <div style="width: 40%; text-align: right;">
              <h5 style="margin: 0 0 5px 0; ">Paid : ${client.paid.amount}</h5>
              <h5 style="margin: 0;">Due : ${client.due}</h5>
            </div>
          </div>
          <div
            style="display: flex; justify-content: space-between; align-items: center; padding: 5px 0; line-height: 1.2; border-bottom: 1px solid steelblue;">
            <div style="width: 50%; text-align: left;">
              <h5 style="margin: 0; padding: 5px 0;">Place___________</h5>
              <h5 style="margin: 0; padding: 5px 0;">Date____________</h5>
            </div>
            <div style="width: 50%; text-align: center;">
              <h5 style="margin: 0;">Sign here</h5>
              <h5 style="margin: 0;">_______________</h5>
            </div>
          </div>
          <div style="margin: 10px auto 0; padding: 10px; width: 70%; text-align: center; background-color: lightskyblue;">
            <p style="margin: 0; font-size: 1.2rem; color: #1976d2;">Feel free to contact us</p>
            <p style="margin: 0; color: grey;">We will happy to give you our best</p>
          </div>
        </div>
    </div>
  </body>`;
};
