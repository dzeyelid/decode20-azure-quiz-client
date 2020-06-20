# de:code 2020 Azure Quiz client

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
  "choices": {
    "id": number,
    "description": string
  },
  "options": {
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
  "corect": {
    "choise": string,
    "description": string
  }
}
```

### Show the result

```json
{
  "state": "reuslt"
}
```
