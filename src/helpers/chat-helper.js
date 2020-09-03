export function messageMarkup(m, users, userId) {
    m.user = users.find(u => m.user_id == u.id);
    m.direction = m.user.id == userId ? "right" : "left";
    return m;
}