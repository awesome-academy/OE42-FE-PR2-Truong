import React from "react";
import "./style.sass";
import moment from "moment";
import { Link } from "react-router-dom";
import { ORDER_TICKET_PAGE_PATH } from "../../constants/routes";

function Schedule({ name, schedules }) {
  return (
    <article className="schedule-component-container">
      <section className="cinema-name">{name}</section>
      <section className="schedule-bound">
        {schedules.length &&
          schedules.map((schedule) => {
            const { id } = schedule;
            return (
              <Link key={id} to={ORDER_TICKET_PAGE_PATH + "/" + id}>
                <time className="schedule-item">
                  {moment(schedule.date).format("HH:mm")}
                </time>
              </Link>
            );
          })}
      </section>
    </article>
  );
}

export default Schedule;
