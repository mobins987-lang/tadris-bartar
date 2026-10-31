/* Local-first progress repository. Queue sync until cloud credentials/session are available. */
(function () {
  const KEY = 'tadris_bartar_sync_queue_v1';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };
  const write = q => localStorage.setItem(KEY, JSON.stringify(q));
  async function enqueue(progress) {
    const item = { ...progress, queued_at: new Date().toISOString() };
    const q = read(); q.push(item); write(q);
    return { savedLocally: true, queued: true };
  }
  async function sync() {
    if (!window.TadrisCloud?.isConfigured() || !navigator.onLine) return { synced: 0, pending: read().length };
    const session = await window.TadrisCloud.getSession();
    if (!session) return { synced: 0, pending: read().length, reason: 'signed-out' };
    const q = read(); let synced = 0;
    while (q.length) {
      try { await window.TadrisCloud.saveProgress(q[0]); q.shift(); synced++; write(q); }
      catch (e) { console.warn('Tadris sync paused:', e.message); break; }
    }
    return { synced, pending: q.length };
  }
  window.TadrisProgressRepository = { enqueue, sync, pendingCount: () => read().length };
  window.addEventListener('online', () => sync().catch(console.warn));
})();
