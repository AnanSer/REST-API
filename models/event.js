// event.js

import db from "../database.js";

// Function to create a new event
export function createEvent({
  title,
  description,
  address,
  date,
  image,
  userId,
}) {
  return new Promise((resolve, reject) => {
    const storagePath = `/path/to/storage/${image}`;
    db.run(
      `
        INSERT INTO events (title, description, address, date, image, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      title,
      description,
      address,
      date,
      storagePath,
      userId,
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({
            id: this.lastID,
            title,
            description,
            address,
            date,
            image: storagePath,
            userId,
          });
        }
      }
    );
  });
}

// Function to edit an existing event by ID
export function editEvent(id, updatedData) {
  return new Promise((resolve, reject) => {
    const storagePath = `/path/to/storage/${updatedData.image}`;
    const stmt = db.prepare(`
            UPDATE events
            SET title = ?, description = ?, address = ?, date = ?, image = ?, user_id = ?
            WHERE id = ?
        `);
    stmt.run(
      updatedData.title,
      updatedData.description,
      updatedData.address,
      updatedData.date,
      storagePath,
      updatedData.image,
      updatedData.userId,
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

// Function to register for an event
export function registerForEvent(eventId, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO registrations (event_id, user_id)
        VALUES (?, ?)
      `,
      eventId,
      userId,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

// Function to unregister from an event
export function unregisterFromEvent(eventId, userId) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        DELETE FROM registrations
        WHERE event_id = ? AND user_id = ?
      `,
      eventId,
      userId,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}
