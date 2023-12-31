"use client";
import React from "react";
import style from "./pagination.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsAsync,
  getPage,
  getPageSize,
  getTotalpost,
} from "../cardList/PostsSlice";
const Pagination = () => {
  let  page = useSelector(getPage);
  let pagesize = useSelector(getPageSize);
  let getTotalPost = useSelector(getTotalpost);
  let dispatch = useDispatch();

  const prev = () => {
    if (page > 1) {
      page = page - 1;
    } else {
      page = page;
    }
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    console.log(pagination, "oaginatikn");
    dispatch(fetchPostsAsync({ pagination }));
  };

  const next = () => {
    if (page < Math.ceil(getTotalPost / pagesize)) {
      page=page+1
    } else {
      page = page
    }
    let pagination = {
      page: page,
      pagesize: pagesize,
    };
    console.log(pagination, "oaginatikn");
    dispatch(fetchPostsAsync({ pagination }));
  };

  return (
    <div className={style.container}>
      <div className={style.pagination}>
        <button onClick={prev} className={style.btn}>
          Prev
        </button>
        <button
          disabled={page == Math.ceil(getTotalPost / pagesize)}
          onClick={next}
          className={style.btn}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
