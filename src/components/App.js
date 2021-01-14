import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect( () => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(data => {
        setQuestions(data)
      })
  }, [])

  const onNewQuestion = (formData) => {
    //console.log(formData)
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: formData.prompt,
        answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
        correctIndex: formData.correctIndex
      })
    })
    .then(r => r.json())
    .then(data => {
      setQuestions([...questions, data])
    })
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      const newList = questions.filter(question => question.id !== id)
      setQuestions(newList)
    })
  }

  const handleCorrect = (index, id) => {
    //console.log(index, id)
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        correctIndex: parseInt(index)
      })
    })
    .then(r => r.json())
    .then(() => {
      const updatedArray = questions.map(question => {
        if (question.id === id) {
          question.correctIndex = parseInt(index)
          return question
        } else {
          return question
        }
      })
      setQuestions(updatedArray)
    })
  }
 
  //console.log(questions)

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
        <QuestionForm newQuestion={onNewQuestion}/> : 
        <QuestionList questions={questions} onDelete={handleDelete} onCorrect={handleCorrect}/>}
    </main>
  );
}

export default App;
