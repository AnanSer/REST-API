// event.js

import db from "../database.js";

// Function to create a new event
export function createEvent(eventData) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
            INSERT INTO events (title, description, address, date)
            VALUES (?, ?, ?, ?)
        `);
    stmt.run(
      eventData.title,
      eventData.description,
      eventData.address,
      eventData.date,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            title: eventData.title,
            description: eventData.description,
            address: eventData.address,
            date: eventData.date,
          });
        }
      }
    );
    stmt.finalize();
  });
}

// Function to edit an existing event by ID
export function editEvent(id, updatedData) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
            UPDATE events
            SET title = ?, description = ?, address = ?, date = ?
            WHERE id = ?
        `);
    stmt.run(
      updatedData.title,
      updatedData.description,
      updatedData.address,
      updatedData.date,
      id,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes > 0); // Returns true if an event was updated
        }
      }
    );
    stmt.finalize();
  });
}

// Function to delete an event by ID
export function deleteEvent(id) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`DELETE FROM events WHERE id = ?`);
    stmt.run(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes > 0); // Returns true if an event was deleted
      }
    });
    stmt.finalize();
  });
}

// Function to get all events
export function getAllEvents() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM events`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Function to get a single event by ID
export function getEventById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM events WHERE id = ?`, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
