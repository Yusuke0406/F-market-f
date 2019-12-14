document.addEventListener(
  "DOMContentLoaded", e =>{
    if (document.getElementById("token_submit") != null) { //token_submitというidがnullの場合、下記コードを実行しない
      Payjp.setPublicKey("pk_test_58392e1461d9d74ed1018221"); //公開鍵直書き
      let btn = document.getElementById("token_submit"); //IDがtoken_submitの場合に取得される
      btn.addEventListener("click", e => { //ボタンが押されてイベント発火
        e.preventDefault();
        let card = {
          number: document.getElementById("card_number").value,
          cvc: document.getElementById("cvc").value,
          exp_month: document.getElementById("exp_month").value,
          exp_year: document.getElementById("exp_year").value,
        }; //入力されたデータを取得
        Payjp.createToken(card, (status, response) => {
          if (status === 200){
            $("#card_nummber").removeAttr("name");
            $("#cvc").removeAttr("name");
            $("#exp_month").removeAttr("name");
            $("#exp_year").removeAttr("name");//データを自サーバにpostしないように削除
            $("#card_token").append(
              $('<input type="hidden" name="payjp-token">').val(response.id)
            );//取得したトークンを送信できる状態にする
            document.inputForm.submit();
            alert("カードの登録が完了しました");
          }else{
            alert("Error");
          }
        });
      });
    }
  },
  false
);