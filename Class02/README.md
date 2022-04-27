## Write the answer of the next sentences

1. alert(null || 2 || undefined)

Answer: 2

2. alert(alert(1) || 2 || alert(3))

Answer: 1 -> 2

3. alert(alert(1) && alert(2))

Answer: 1 -> undefined

4. alert(null || 2 && 3 || 4)

Answer: 3

5. Write an if condition to check that age is between 14 and 90 inclusively

Answer: if(age>=14 && age<=90) return true; else return false;

6. alert(alert(null) ?? null ?? 2 ?? alert(3))

Answer: null -> 2

7. Which of these alerts are going to execute?

- if (-1 || 0) alert('first')
- if (-1 && 0) alert('second')
- if (null || -1 && 1) alert('third')

Answer: first and third

8. ```
   let user;
   alert(user ?? "Anonymus");
   ```

Answer: "Anonymus"

9. ```
      let firstName = null;
      let lastName = null;
      let nickName = "Supoercoder";
      alert(firstName ?? lastName ?? nickName ?? "Anonymus");
   ```

   Answer: Supercoder

10. ```
    let age = prompt('age?', 18);
    let message = (age < 3) ? 'Hi, baby!' :
        age < 18 ? 'Hello!' :
        age < 100 ? 'Greetings!' :
        'What an unusual age!';
        alert(message);
    ```

    Answer: Greetings!

11. ```
    5 > 4
    "apple" > "pineapple"
    "2" > "12"
    undefined == null
    undefined === null
    null == "\n0\n"
    null === +"\n0\n"
    ```

- true
- false
- true
- true
- false
- false
- false
