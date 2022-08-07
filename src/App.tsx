import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { login, logout, saveDetails } from "src/redux/slices/studentSlice";
import type { RootState, AppDispatch } from "src/redux/store";

import Login from "src/features/login";
import Card from "src/components/card";
import Button from "src/components/button";
import { base } from "src/config";
import { LoginFormData } from "src/types";
import { getFilterByFormula } from "src/helpers";
import { INITIAL_LOGIN_DATA } from "src/constants";

import { ICard, ILoginForm } from "src/types";

import "src/App.css";

const App = () => {
  const student = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch<AppDispatch>();

  const methods = useForm<ILoginForm>(INITIAL_LOGIN_DATA);
  const {
    reset,
    formState: { errors },
    setError,
  } = methods;

  const setErrorMessage = () => {
    handleLogout();
    setError("studentName", {
      type: "custom",
      message: "Enter a valid student name.",
    });
  };

  const onSubmit: SubmitHandler<ILoginForm> = (loginData) => {
    dispatch(
      login({
        name: loginData.studentName,
      })
    );
    reset(INITIAL_LOGIN_DATA);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  React.useEffect(() => {
    if (Boolean(student.name?.length && !student.classes?.length)) {
      try {
        (async () => {
          const classIds = await base("Students")
            .select({
              view: "Grid view",
              filterByFormula: `Name = '${student.name}'`,
            })
            .firstPage()
            .then((res) => {
              if (!res.length) {
                setErrorMessage();
                return;
              }
              return res?.[0]?.fields?.Classes;
            });

          if (!!classIds) {
            const classNamesWithStudentIds = await base("Classes")
              .select({
                view: "Grid view",
                filterByFormula: getFilterByFormula(classIds),
              })
              .firstPage()
              .then((res) => {
                if (!res.length) {
                  setErrorMessage();
                  return;
                }
                return res.map((item) => ({
                  name: item?.fields?.Name,
                  students: item?.fields?.Students,
                }));
              });

            if (!!classNamesWithStudentIds) {
              const studentIds = [
                ...new Set([
                  ...classNamesWithStudentIds.flatMap((item) => item.students),
                ]),
              ];

              const studentNames = await base("Students")
                .select({
                  view: "Grid view",
                  filterByFormula: getFilterByFormula(studentIds),
                })
                .firstPage()
                .then((res) => {
                  if (res.length) {
                    return res.reduce((acc, item) => {
                      acc[item.id] = item.fields.Name;
                      return acc;
                    }, {});
                  }
                });
              if (!studentNames) {
                setErrorMessage();
                return;
              }
              const data = classNamesWithStudentIds.map((item) => ({
                ...item,
                students: item.students.map((id: string) => studentNames[id]),
              }));
              dispatch(
                saveDetails({
                  classes: data,
                })
              );
            }
          }
        })();
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }
  }, [student]);

  let content;

  if (Boolean(student?.classes?.length)) {
    content = (
      <div className="cardsWrapper">
        <Button className="logoutButton" onClick={handleLogout}>
          Logout
        </Button>
        {student.classes.map((item: ICard) => (
          <Card key={item.name} name={item.name} students={item.students} />
        ))}
      </div>
    );
  } else if (Boolean(student?.name && !errors?.studentName)) {
    content = <span>Loading...</span>;
  } else {
    content = (
      <FormProvider {...methods}>
        <Login onSubmit={onSubmit} />
      </FormProvider>
    );
  }

  return <div className="root">{content}</div>;
};

export default App;
