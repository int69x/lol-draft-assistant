import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [opggUrl, setOpggUrl] = useState('');
  const [scoutData, setScoutData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleScout = async () => {
    if (!opggUrl) return;
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/scout`, { url: opggUrl });
      setScoutData(response.data);
    } catch (error) {
      setScoutData({ error: 'Erreur lors du scouting.' });
    } finally {
      setLoading(false);
    }
  };

  const renderScoutDetails = () => {
    if (!scoutData || scoutData.error) return <p className="text-red-500">{scoutData?.error}</p>;

    return (
      <div className="space-y-4">
        {scoutData.players && scoutData.players.map((player, idx) => (
          <div key={idx} className="p-4 bg-gray-800 rounded">
            <h3 className="text-lg font-bold">{player.name} ({player.role})</h3>
            <p>Champions joués récemment avec winrates :</p>
            <ul className="list-disc ml-6">
              {player.champions.map((champ, i) => (
                <li key={i}>{champ.name} - {champ.winrate}%</li>
              ))}
            </ul>
          </div>
        ))}

        {scoutData.recommended_bans && (
          <div className="p-4 bg-red-900 rounded border border-red-500">
            <h2 className="text-xl font-bold text-red-300">📛 Recommandations IA – Bans Stratégiques</h2>
            <ul className="mt-2 list-disc ml-6">
              {scoutData.recommended_bans.map((ban, i) => (
                <li key={i}>{ban.champion} – cible : {ban.player} ({ban.role})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">LOL Draft Assistant Pro – IA Scouting</h1>

      <div className="mb-4">
        <label className="block mb-1">Lien OP.GG de l'équipe adverse :</label>
        <input
          type="text"
          value={opggUrl}
          onChange={(e) => setOpggUrl(e.target.value)}
          placeholder="https://www.op.gg/multisearch/euw?..."
          className="w-full p-2 rounded text-black"
        />
      </div>

      <button
        onClick={handleScout}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
      >
        {loading ? 'Analyse en cours...' : 'Lancer le Scout IA'}
      </button>

      <div className="mt-6">
        {renderScoutDetails()}
      </div>
    </div>
  );
}

export default App;
