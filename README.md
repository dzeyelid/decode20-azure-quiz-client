# de:code 2020 Azure Quiz client

## ローカルでの確認方法

### フロントエンドの起動

Vue の開発サーバを起動します。

```ps1
cd client
npm install
npm run serve
```

http://localhost:8080 へアクセス

### APIの起動

1. `local.settings.example.json` を `local.settings.json` というファイル名で複製します。

2. Azure Storage Emulator を起動します。
   - 参考: [Azure ストレージ エミュレーターを使用した開発とテスト | Microsoft Docs](https://docs.microsoft.com/ja-jp/azure/storage/common/storage-use-emulator)

3. Visual Studio Code を利用している場合は F5 で実行してください。
   - もしくは、下記の用のコマンドラインから Azure Functions をローカルで起動します。

```ps1
cd api
npm run start
```

## 回答API

LogicApps による回答収集APIについては、下記に定義します。

- [openapi.yaml](./docs/openapi.yaml)

## SignalR によるメッセージ

### Show the question and choices

```json
{
  "state": "show",
  "question": {
    "id": number,
    "description": string
  },
  "choices": {
    "a": {
      "description": string
    },
    "b": {
      "description": string
    },
    "c": {
      "description": string
    },
    "d": {
      "description": string
    }
  }
}
```

### Start answering

```json
{
  "state": "start",
  "question": {
    "id": number,
    "description": string
  },
  "choices": {
    "a": {
      "description": string
    },
    "b": {
      "description": string
    },
    "c": {
      "description": string
    },
    "d": {
      "description": string
    }
  }
}
```

### Finish answering

```json
{
  "state": "finish",
  "question": {
    "id": number,
    "description": string
  },
  "choices": {
    "a": {
      "description": string
    },
    "b": {
      "description": string
    },
    "c": {
      "description": string
    },
    "d": {
      "description": string
    }
  },
  "correct": {
    "choice": string,
    "description": string
  }
}
```

### Show the result

```json
{
  "state": "result"
}
```
