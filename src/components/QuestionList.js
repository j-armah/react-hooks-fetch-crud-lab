import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({ questions, onDelete, onCorrect }) {
  //console.log(questions[0])

  const questionList = questions.map(question => 
    <QuestionItem 
      key={question.id}
      id={question.id}
      prompt={question.prompt}
      answers={question.answers}
      correctIndex={question.correctIndex}
      onDelete={onDelete}
      onCorrect={onCorrect}
    />
  )

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questionList}
      </ul>
    </section>
  );
}

export default QuestionList;
