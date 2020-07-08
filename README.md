# de:code 2020 Azure Quiz client

## ローカルでの確認方法

### フロントエンドの起動

`client` ディレクトリ配下に、 `.env.local` を作成し、下記の変数を値とともに設定してください。

```env
VUE_APP_SEND_ANSWER_URL=<Url to send an answer>
VUE_APP_GET_QUESTION_URL=<Url to get the current url>
```

Vue の開発サーバを起動します。

```ps1
cd client
npm install
npm run serve
```

http://localhost:8080 へアクセス

### APIの起動

1. `local.settings.json` の準備
   1. `local.settings.example.json` を `local.settings.json` というファイル名で複製します。
   1. `AzureSignalRConnectionString` に SignalR service の接続文字列を設定して下さい。

2. Azure Storage Emulator を起動します。
   - 参考: [Azure ストレージ エミュレーターを使用した開発とテスト | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/storage/common/storage-use-emulator)

3. Visual Studio Code を利用している場合は F5 で実行してください。
   - もしくは、下記の用のコマンドラインから Azure Functions をローカルで起動します。

```ps1
cd api
npm install
npm run start
```

## 関連API

### 回答API

LogicApps による回答収集APIについては、下記に定義します。

- [to-logicapp.yaml](./docs/openapi/to-logicapp.yaml)

### 回答クライアント操作API

本回答クライアントに対しての操作に関する OpenAPI 定義はこちらです。

- [to-web-client.yaml](./docs/openapi/to-web-client.yaml)

#### Visual Studio Code の REST Client を利用したサンプルメッセージ送信

[REST Client 拡張機能](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)で利用できるサンプルを用意しました。ローカル環境での確認にご利用ください。

- [sample.http](./docs/sample.http)

#### 回答クライアントに送信するメッセージ

##### Show the question and choices

質問と選択肢を表示します。

```json
{
  "state": "show",
  "question": {
    "id": "1",
    "description": "質問の内容",
    "category": "カテゴリ",
    "point": 100,
    "position": {
      "current": 1,  # 現在の問題位置
      "tail": 8      # 最後尾の問題位置
    }
  },
  "choices": {
    "a": {
      "description": "選択肢 a の説明"
    },
    "b": {
      "description": "選択肢 a の説明"
    },
    "c": {
      "description": "選択肢 a の説明"
    },
    "d": {
      "description": "選択肢 a の説明"
    }
  }
}
```

##### Start answering

回答画面を表示し、回答を送信するできる状態にします。

```json
{
  "state": "start",
  "question": {
    "id": "1",
    "description": "質問の内容",
    "category": "カテゴリ",
    "point": 100,
    "position": {
      "current": 1,  # 現在の問題位置
      "tail": 8      # 最後尾の問題位置
    }
  },
  "choices": {
    "a": {
      "description": "選択肢 a の説明"
    },
    "b": {
      "description": "選択肢 a の説明"
    },
    "c": {
      "description": "選択肢 a の説明"
    },
    "d": {
      "description": "選択肢 a の説明"
    }
  }
}
```

##### Finish answering

回答画面を終了させます。

```json
{
  "state": "finish",
  "question": {
    "id": "1",
    "description": "質問の内容",
    "category": "カテゴリ",
    "point": 100,
    "position": {
      "current": 1,  # 現在の問題位置
      "tail": 8      # 最後尾の問題位置
    }
  },
  "choices": {
    "a": {
      "description": "選択肢 a の説明"
    },
    "b": {
      "description": "選択肢 a の説明"
    },
    "c": {
      "description": "選択肢 a の説明"
    },
    "d": {
      "description": "選択肢 a の説明"
    }
  },
  "correct": {
    "choice": "a",  # 答えID (a or b or c or d)
    "description": "答えの解説"
  }
}
```

##### Show the result

全体の結果を表示します。

```json
{
  "state": "result"
}
```

##### Initialize

初期化します。

```json
{
  "state": "init"
}
```
