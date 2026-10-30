import React, { useState } from 'react';
import { useSocket } from '../../context/SocketContext';
import { Globe, Shield, Save, CheckCircle, ExternalLink, Link2 } from 'lucide-react';

export const AdminUrls = () => {
  const { products, triggerUpdateProduct } = useSocket();
  const [editingUrls, setEditingUrls] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (productId, field, value) => {
    setEditingUrls((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSaveUrl = async (prod) => {
    const changes = editingUrls[prod.id || prod.slug];
    if (!changes) return;

    try {
      await triggerUpdateProduct(prod.id || prod.slug, changes);
      setSaveStatus(`Saved URLs for ${prod.name}`);
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (err) {
      alert('Failed to save URLs: ' + err.message);
    }
  };

  return (
    <div className="admin-page-view">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-heading">Website &amp; Admin Dashboard URL Directory</h1>
          <p className="admin-subtext">
            Configure external website URLs, landing pages, and administration routes for each ERP application.
          </p>
        </div>
      </div>

      {saveStatus && (
        <div className="modal-alert-success">
          <CheckCircle size={16} />
          <span>{saveStatus}</span>
        </div>
      )}

      <div className="admin-card table-card">
        <div className="table-responsive">
          <table className="admin-data-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Product Name</th>
                <th style={{ width: '35%' }}>Website URL (Public Landing / Demo)</th>
                <th style={{ width: '30%' }}>Admin Dashboard URL (Internal Portal)</th>
                <th style={{ width: '13%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => {
                const currentEdit = editingUrls[prod.id || prod.slug] || {};
                const currentWeb =
                  currentEdit.websiteUrl !== undefined
                    ? currentEdit.websiteUrl
                    : prod.websiteUrl || '';
                const currentAdmin =
                  currentEdit.adminUrl !== undefined
                    ? currentEdit.adminUrl
                    : prod.adminUrl || '/admin/products';

                const hasChanges =
                  (currentEdit.websiteUrl !== undefined &&
                    currentEdit.websiteUrl !== prod.websiteUrl) ||
                  (currentEdit.adminUrl !== undefined &&
                    currentEdit.adminUrl !== prod.adminUrl);

                return (
                  <tr key={prod.id || prod.slug}>
                    <td>
                      <strong className="prod-table-name">{prod.name}</strong>
                      <span className="prod-table-cat">{prod.category}</span>
                    </td>

                    <td>
                      <div className="url-input-group">
                        <Globe size={15} className="text-icon-green" />
                        <input
                          type="text"
                          value={currentWeb}
                          onChange={(e) =>
                            handleInputChange(
                              prod.id || prod.slug,
                              'websiteUrl',
                              e.target.value
                            )
                          }
                          className="url-quick-input"
                          placeholder="https://speshway.com/your-product"
                        />
                        {prod.websiteUrl && (
                          <a
                            href={prod.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="url-test-icon"
                            title="Open URL in new tab"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </td>

                    <td>
                      <div className="url-input-group">
                        <Shield size={15} className="text-icon-purple" />
                        <input
                          type="text"
                          value={currentAdmin}
                          onChange={(e) =>
                            handleInputChange(
                              prod.id || prod.slug,
                              'adminUrl',
                              e.target.value
                            )
                          }
                          className="url-quick-input"
                          placeholder="/admin/products"
                        />
                      </div>
                    </td>

                    <td>
                      <button
                        onClick={() => handleSaveUrl(prod)}
                        disabled={!hasChanges}
                        className={`btn-save-url ${hasChanges ? 'dirty' : ''}`}
                      >
                        <Save size={14} /> Save
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
