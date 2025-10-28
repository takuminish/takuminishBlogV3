---
title: 【メモ】Karabiner-Elementsで使用している設定
date: "2024-05-03T22:12:03.284Z"
description: "わたしの個人PCはmacであり、karabinerを使用しています。その設定内容を紹介します。"
---

# Karabiner-Elementsとは
karabinerとはmacOS用のキーボードカスタマイズソフトウェアです。キーを別のキーにマッピングしたり、キーを他のキーの組み合わせで表現したりできます。
karabinerをしようすることで、矢印キーをvimのhjklにマッピングできたりします。
- https://karabiner-elements.pqrs.org/

# 使用している設定
-  Left ctrl + hjkl to arrow keys Vim
-  option + hjkl to mouse move, option + ui to left click, right click
 
## Left ctrl + hjkl to arrow keys Vim
2023年より、vimを使用するようになりhjklによる操作にも慣れてきたので、vim以外の他のアプリでもhjklでカーソルを移動させたいと思ったのが、理由です。また、同時期にキーボードをHHKBに変更しており、物理的な矢印キーがなくなったのも理由の1つです。

https://ke-complex-modifications.pqrs.org/?q=vim の検索結果からimportします。

## option + hjkl to mouse move, option + ui to left click, right click
なるべく、マウスを使いたくないという思いで、設定しました。https://ke-complex-modifications.pqrs.org/ には良いキーマップがなかったので、独自に設定しました。

```json
{
    "description": "New Rule (option + hjkl => mouse  control, option +  ui => left click, rght click)",
    "manipulators": [
        {
            "from": {
                "key_code": "h",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "mouse_key": {
                        "x": -1800
                    }
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "j",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "mouse_key": {
                        "y": 1800
                    }
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "k",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "mouse_key": {
                        "y": -1800
                    }
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "l",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "mouse_key": {
                        "x": 1800
                    }
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "u",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "pointing_button": "button1"
                }
            ],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "i",
                "modifiers": {
                    "mandatory": [
                        "option"
                    ]
                }
            },
            "to": [
                {
                    "pointing_button": "button2"
                }
            ],
            "type": "basic"
        }
    ]
}
```

なにか良い設定があれば都度、追加していきたいです。