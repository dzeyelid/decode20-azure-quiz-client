# de:code 2020 Azure Quiz client

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
    "choise": string,
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
