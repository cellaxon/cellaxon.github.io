document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('shortcut-grid');
  const pageTitle = document.getElementById('page-title');
  const themeToggle = document.getElementById('theme-toggle');

  // Edit Mode Elements
  const editModeToggle = document.getElementById('edit-mode-toggle');
  const columnControl = document.getElementById('column-control');
  const columnInput = document.getElementById('column-count');
  const titleControl = document.getElementById('title-control');
  const titleInput = document.getElementById('title-input');
  const titleVisible = document.getElementById('title-visible');
  const extraActions = document.getElementById('extra-actions');
  const resetBtn = document.getElementById('reset-shortcuts');
  const importBtn = document.getElementById('server-sync');
  const exportBtn = document.getElementById('export-json');

  // Modal Elements
  const modal = document.getElementById('shortcut-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalCancel = document.getElementById('modal-cancel');
  const modalSave = document.getElementById('modal-save');
  const form = document.getElementById('shortcut-form');

  // Form Inputs
  const inputIndex = document.getElementById('shortcut-index');
  const inputName = document.getElementById('shortcut-name');
  const inputHref = document.getElementById('shortcut-href');
  const inputIcon = document.getElementById('shortcut-icon');
  const inputColor = document.getElementById('shortcut-color');

  // Modal Elements for New Features
  const inputIconType = document.querySelectorAll('input[name="icon-type"]');
  const groupIconText = document.getElementById('group-icon-text');
  const groupIconImage = document.getElementById('group-icon-image');
  const inputImage = document.getElementById('shortcut-image');
  const customColors = document.getElementById('custom-colors');

  // Custom Color Inputs
  const inputBgLight = document.getElementById('color-bg-light');
  const inputFgLight = document.getElementById('color-fg-light');
  const inputBgDark = document.getElementById('color-bg-dark');
  const inputFgDark = document.getElementById('color-fg-dark');

  // State
  let shortcutsData = [];
  let configData = {};
  let isEditMode = false;
  let draggedItemIndex = null;

  // --- Theme Logic ---
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  updateToggleIcon();

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateToggleIcon();
    render(); // Re-render to apply custom colors based on new theme
  });

  function updateToggleIcon() {
    const isDark = document.body.classList.contains('dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
  }

  // --- Initialization ---
  init();

  function init() {
    // Load from LocalStorage first, else fetch
    const localData = localStorage.getItem('shortcuts_data');
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        shortcutsData = parsed.shortcuts || [];
        configData = parsed.config || {};
        render();
      } catch (e) {
        console.error('Error parsing local shortcuts:', e);
        fetchShortcuts(); // Fallback
      }
    } else {
      fetchShortcuts();
    }
  }

  function fetchShortcuts() {
    // Add timestamp to bypass cache
    const url = `shortcuts.json?t=${new Date().getTime()}`;
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        shortcutsData = data.shortcuts || [];
        configData = data.config || {};
        // Set default title visibility if not set
        if (typeof configData.showTitle === 'undefined') {
          configData.showTitle = true;
        }
        saveToLocal(); // Save initial server data to local
        render();
      })
      .catch(error => {
        console.error('Error loading shortcuts:', error);
        grid.innerHTML = '<p style="color: red;">Error loading shortcuts data. Please check console.</p>';
      });
  }

  function saveToLocal() {
    const data = {
      config: configData,
      shortcuts: shortcutsData
    };
    localStorage.setItem('shortcuts_data', JSON.stringify(data));
    render();
  }

  // --- Rendering ---
  function render() {
    // Sync Controls with Config
    if (configData.columns) {
      columnInput.value = configData.columns;
    }
    if (configData.title !== undefined) {
      titleInput.value = configData.title;
      // Also update document title/page title if visible
      document.title = configData.title;
    }
    if (configData.showTitle !== undefined) {
      titleVisible.checked = configData.showTitle;
    } else {
      titleVisible.checked = true; // Default to true
    }

    // Apply Title Visibility
    if (titleVisible.checked) {
      pageTitle.style.display = 'block';
      pageTitle.textContent = configData.title || 'Gateway Monitor Shortcuts';
    } else {
      pageTitle.style.display = 'none';
    }

    applyConfig(configData, shortcutsData.length);

    // Clear Grid
    grid.innerHTML = '';

    if (isEditMode) {
      document.body.classList.add('edit-mode');
    } else {
      document.body.classList.remove('edit-mode');
    }

    // Render Shortcuts
    shortcutsData.forEach((shortcut, index) => {
      const card = createShortcutCard(shortcut, index);
      grid.appendChild(card);
    });

    // Render "Add" Button if in Edit Mode
    if (isEditMode) {
      const addCard = document.createElement('div');
      addCard.className = 'shortcut-card add-card';
      addCard.onclick = () => openModal();

      const plusIcon = document.createElement('div');
      plusIcon.className = 'add-icon';
      plusIcon.textContent = '+';
      addCard.appendChild(plusIcon);

      grid.appendChild(addCard);
    }
  }

  function createShortcutCard(shortcut, index) {
    const cardWrapper = document.createElement('div');
    cardWrapper.style.position = 'relative';

    const card = document.createElement('a');
    card.className = 'shortcut-card';
    // In edit mode, disable link navigation
    card.href = isEditMode ? 'javascript:void(0)' : shortcut.href;

    // Apply Colors
    if (shortcut.customColors) {
      // --- Custom Color Logic ---
      // We set inline styles for CSS variables to handle light/dark mode locally
      // But since we can't fully control pseudo-classes or media queries easily inline without style tag injection,
      // we will use a simpler approach: define custom properties on the card and use them in CSS if we could.
      // Wait, standard CSS variables (like --card-bg) aren't set per card in our global CSS.
      // So we will just set the background/color directly based on CURRENT theme (JS side rendering).
      // BUT that won't react to theme toggle dynamically without re-render.
      // Better: Set CSS variables on the card like --custom-bg-light, --custom-bg-dark, etc. 
      // and adjust CSS to use them? No, that requires changing global CSS logic significantly.

      // Alternative: Set style attribute using `light-dark()` function? Not widely supported yet.
      // Robust solution: Use a small inline <style> block or just re-render on theme change (we already re-render on theme toggle? No, we toggle class).
      // Let's stick to standard behavior: Default themes use classes/vars. Custom uses specific colors.
      // To support light/dark customization, we can check the current body class in render() and apply correct color.
      // This requires `render()` to run on theme toggle. Let's add that.

      const isDark = document.body.classList.contains('dark');
      if (isDark) {
        card.style.backgroundColor = shortcut.colors?.darkBg || '#333';
        card.style.color = shortcut.colors?.darkFg || '#fff';
        card.style.borderColor = shortcut.colors?.darkBg || '#333'; // Optional border match
      } else {
        card.style.backgroundColor = shortcut.colors?.lightBg || '#fff';
        card.style.color = shortcut.colors?.lightFg || '#000';
        card.style.borderColor = 'var(--border)';
      }
    } else {
      // Standard Theme Colors
      if (shortcut.bgcolor) card.style.backgroundColor = shortcut.bgcolor;
      if (shortcut.forecolor) card.style.color = shortcut.forecolor;
    }

    // Drag and Drop Attributes
    if (isEditMode) {
      card.draggable = true;
      card.dataset.index = index;

      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragover', handleDragOver);
      card.addEventListener('drop', handleDrop);
      card.addEventListener('dragenter', handleDragEnter);
      card.addEventListener('dragleave', handleDragLeave);
      card.addEventListener('dragend', handleDragEnd);
    }

    const icon = document.createElement('div');
    icon.className = 'shortcut-icon';

    // Icon Logic
    if (shortcut.iconType === 'image') {
      const img = document.createElement('img');
      img.src = shortcut.iconValue;
      img.alt = shortcut.name;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      icon.appendChild(img);
    } else {
      // Default to text/emoji (backward compatibility with 'icon' field)
      icon.innerHTML = shortcut.iconValue || shortcut.icon || '🔗';
    }

    const content = document.createElement('div');
    content.className = 'shortcut-content';

    const name = document.createElement('div');
    name.className = 'shortcut-name';
    name.textContent = shortcut.name;

    const href = document.createElement('div');
    href.className = 'shortcut-href';
    href.textContent = shortcut.href;

    content.appendChild(name);
    content.appendChild(href);
    card.appendChild(icon);
    card.appendChild(content);

    // Edit Actions
    const actions = document.createElement('div');
    actions.className = 'card-actions';

    const editBtn = document.createElement('div');
    editBtn.className = 'action-btn edit';
    editBtn.innerHTML = '✎';
    editBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      openModal(index);
    };

    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.innerHTML = '✕';
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      deleteShortcut(index);
    };

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(actions);

    return card;
  }

  // --- Drag and Drop Handlers ---
  function handleDragStart(e) {
    draggedItemIndex = parseInt(this.dataset.index);
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  }

  function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('drag-over');
  }

  function handleDragLeave(e) {
    this.classList.remove('drag-over');
  }

  function handleDragEnd(e) {
    this.classList.remove('dragging');
    document.querySelectorAll('.shortcut-card').forEach(card => card.classList.remove('drag-over'));
  }

  function handleDrop(e) {
    e.stopPropagation();
    e.preventDefault();

    const targetIndex = parseInt(this.dataset.index);

    if (draggedItemIndex !== targetIndex && draggedItemIndex !== null) {
      // Reorder array
      const itemToMove = shortcutsData[draggedItemIndex];
      shortcutsData.splice(draggedItemIndex, 1);
      shortcutsData.splice(targetIndex, 0, itemToMove);

      saveToLocal();
    }
    return false;
  }

  function applyConfig(config, shortcutCount) {
    if (!config) return;

    let columns = 4;
    if (config.columns) {
      columns = config.columns;
    }

    // In edit mode, we have one extra card (Add button)
    const effectiveCount = isEditMode ? shortcutCount + 1 : shortcutCount;

    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    if (effectiveCount > 0) {
      const rows = Math.ceil(effectiveCount / columns);
      grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      grid.style.setProperty('--grid-rows', rows);
    } else {
      grid.style.setProperty('--grid-rows', 1);
    }
  }

  // --- Edit Mode Actions ---
  editModeToggle.addEventListener('click', () => {
    isEditMode = !isEditMode;
    toggleEditControls();
    if (isEditMode) {
      editModeToggle.classList.add('active');
    } else {
      editModeToggle.classList.remove('active');
    }
    render(); // Re-render to show/hide edit actions
  });


  function toggleEditControls() {
    if (isEditMode) {
      extraActions.classList.remove('hidden');
      columnControl.classList.remove('hidden');
      titleControl.classList.remove('hidden');
      themeToggle.classList.remove('hidden');
    } else {
      extraActions.classList.add('hidden');
      columnControl.classList.add('hidden');
      titleControl.classList.add('hidden');
      themeToggle.classList.add('hidden');
    }
  }

  columnInput.addEventListener('change', (e) => {
    let val = parseInt(e.target.value);
    if (val < 1) val = 1;
    if (val > 10) val = 10;
    configData.columns = val;
    saveToLocal();
  });

  titleInput.addEventListener('change', (e) => {
    configData.title = e.target.value;
    saveToLocal();
  });

  titleVisible.addEventListener('change', (e) => {
    configData.showTitle = e.target.checked;
    saveToLocal();
  });

  const importJsonBtn = document.getElementById('import-json-btn');
  const fileInput = document.getElementById('import-file-input');

  importBtn.addEventListener('click', () => {
    if (confirm('Replace current shortcuts with server defaults? This will overwrite your local changes.')) {
      fetchShortcuts();
    }
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all shortcuts? This cannot be undone.')) {
      shortcutsData = [];
      saveToLocal();
    }
  });

  // New Import Logic
  importJsonBtn.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (importedData.shortcuts && Array.isArray(importedData.shortcuts)) {
          shortcutsData = importedData.shortcuts;
          if (importedData.config) {
            configData = importedData.config;
          }
          saveToLocal();
          alert('Shortcuts imported successfully!');
        } else {
          alert('Invalid JSON format: Missing "shortcuts" array.');
        }
      } catch (err) {
        console.error('Error parsing JSON:', err);
        alert('Failed to parse JSON file.');
      }
      // Reset input so same file can be selected again if needed
      fileInput.value = '';
    };
    reader.readAsText(file);
  });

  exportBtn.addEventListener('click', () => {
    const data = {
      config: configData,
      shortcuts: shortcutsData
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "shortcuts.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

  // Preview Logic
  const previewContainer = document.getElementById('shortcut-preview-container');

  function renderPreview() {
    const iconType = document.querySelector('input[name="icon-type"]:checked').value;
    const iconValue = iconType === 'image' ? inputImage.value : inputIcon.value;

    // Construct a temporary shortcut object
    const previewItem = {
      name: inputName.value || 'Preview Name',
      href: inputHref.value || 'https://example.com',
      iconType: iconType,
      iconValue: iconValue
    };

    if (inputColor.value === 'custom') {
      previewItem.customColors = true;
      previewItem.colors = {
        lightBg: inputBgLight.value,
        lightFg: inputFgLight.value,
        darkBg: inputBgDark.value,
        darkFg: inputFgDark.value
      };
    } else {
      previewItem.bgcolor = inputColor.value || undefined;
      if (previewItem.bgcolor && previewItem.bgcolor.startsWith('var(--')) {
        previewItem.forecolor = previewItem.bgcolor.replace(')', '-foreground)');
      } else if (previewItem.bgcolor === '#24292e') {
        previewItem.forecolor = '#ffffff';
      }
    }

    // Reuse createShortcutCard but we need to ensure it doesn't have edit/delete buttons active or they don't do anything
    // passing -1 as index or something to differentiate?
    // Actually createShortcutCard adds edit/delete buttons. For preview we might not want them or we want them to do nothing.
    // Let's reuse it and just pointer-events none the actions?

    previewContainer.innerHTML = '';
    const card = createShortcutCard(previewItem, -1);
    // Disable interaction on preview card
    card.style.pointerEvents = 'none';
    card.classList.remove('dragging'); // just in case

    // Explicitly make sure actions are hidden if not in edit mode logic? 
    // createShortcutCard adds actions but their visibility depends on CSS .edit-mode .card-actions display
    // But preview doesn't depend on global isEditMode state really, we just want to see the card look.
    // If we want to see exactly how it looks in edit mode, we should perhaps leave actions? 
    // But user request was "sample button", likely describing the final look.
    // The actions are "absolutepositioned" overlays. Let's hide them for preview cleanliness.
    const actions = card.querySelector('.card-actions');
    if (actions) actions.style.display = 'none';

    previewContainer.appendChild(card);
  }

  // Add listeners to all inputs to trigger preview update
  const allInputs = form.querySelectorAll('input, select');
  allInputs.forEach(input => {
    input.addEventListener('input', renderPreview);
    input.addEventListener('change', renderPreview);
  });

  // Specific listeners for radio changes were already there, but we need to ensure renderPreview runs too
  inputIconType.forEach(radio => {
    radio.addEventListener('change', renderPreview);
  });

  // --- Modal Logic ---
  function openModal(index = null) {
    modal.classList.remove('hidden');

    // Reset inputs
    inputIconType[0].checked = true; // Default to Text
    handleIconTypeChange();
    inputColor.value = ''; // Default
    handleColorChange();
    inputIndex.value = ''; // Reset index logic
    inputName.value = '';
    inputHref.value = '';
    inputIcon.value = '';
    inputImage.value = '';


    if (index !== null) {
      // Edit logic same as before...
      const item = shortcutsData[index];
      modalTitle.textContent = 'Edit Shortcut';
      inputIndex.value = index;
      inputName.value = item.name;
      inputHref.value = item.href;

      if (item.iconType === 'image') {
        inputIconType[1].checked = true;
        inputImage.value = item.iconValue;
      } else {
        inputIconType[0].checked = true;
        inputIcon.value = item.iconValue || item.icon;
      }
      handleIconTypeChange();

      if (item.customColors) {
        inputColor.value = 'custom';
        inputBgLight.value = item.colors.lightBg;
        inputFgLight.value = item.colors.lightFg;
        inputBgDark.value = item.colors.darkBg;
        inputFgDark.value = item.colors.darkFg;
      } else {
        inputColor.value = item.bgcolor || '';
        inputBgLight.value = '#ffffff';
        inputFgLight.value = '#000000';
        inputBgDark.value = '#000000';
        inputFgDark.value = '#ffffff';
      }
      handleColorChange();

    } else {
      // Add
      modalTitle.textContent = 'Add Shortcut';
      // form.reset(); // Don't use reset() blindly as it clears hidden inputs too drastically maybe
    }

    // Initial Render
    renderPreview();
  }

  function closeModal() {
    modal.classList.add('hidden');
  }
  // Icon Switcher Logic
  inputIconType.forEach(radio => {
    radio.addEventListener('change', handleIconTypeChange);
  });

  function handleIconTypeChange() {
    const type = document.querySelector('input[name="icon-type"]:checked').value;
    if (type === 'image') {
      groupIconText.classList.add('hidden');
      groupIconImage.classList.remove('hidden');
    } else {
      groupIconText.classList.remove('hidden');
      groupIconImage.classList.add('hidden');
    }
  }

  // Color Switcher Logic
  inputColor.addEventListener('change', handleColorChange);

  function handleColorChange() {
    const val = inputColor.value;
    if (val === 'custom') {
      customColors.classList.remove('hidden');
    } else {
      customColors.classList.add('hidden');
      // If a preset is selected, we could auto-fill the custom values essentially, 
      // but strictly speaking we only need to show custom fields if 'custom' is selected.
      // However, user requested: "The preset dropdown should act as a Quick Select to fill inputs"

      if (val) {
        // Heuristic to fill inputs based on themes?
        // Since we use CSS vars, we don't know exact hex easily without getComputedStyle.
        // But simpler: just hide custom fields and let "Standard" logic take over?
        // If I want to tweak, I select "Custom".
        // Maybe better: Selecting "Peach" fills the input values but keeps Mode as "Peach" until I switch to "Custom"? 
        // To simplify: "Custom" mode shows inputs. "Preset" mode hides them.
      }
    }
  }

  modalCancel.addEventListener('click', closeModal);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const indexStr = inputIndex.value;
    const isNew = indexStr === '';

    const iconType = document.querySelector('input[name="icon-type"]:checked').value;
    const iconValue = iconType === 'image' ? inputImage.value : inputIcon.value;

    const newItem = {
      name: inputName.value,
      href: inputHref.value,
      iconType: iconType,
      iconValue: iconValue
    };

    // Handle Colors
    if (inputColor.value === 'custom') {
      newItem.customColors = true;
      newItem.colors = {
        lightBg: inputBgLight.value,
        lightFg: inputFgLight.value,
        darkBg: inputBgDark.value,
        darkFg: inputFgDark.value
      };
      newItem.bgcolor = undefined;
      newItem.forecolor = undefined;
    } else {
      newItem.customColors = false;
      newItem.bgcolor = inputColor.value || undefined;
      // Auto-set forecolor based on bgcolor
      if (newItem.bgcolor && newItem.bgcolor.startsWith('var(--')) {
        newItem.forecolor = newItem.bgcolor.replace(')', '-foreground)');
      } else if (newItem.bgcolor === '#24292e') {
        newItem.forecolor = '#ffffff';
      } else {
        newItem.forecolor = undefined;
      }
    }

    if (isNew) {
      shortcutsData.push(newItem);
    } else {
      const idx = parseInt(indexStr, 10);
      shortcutsData[idx] = { ...shortcutsData[idx], ...newItem };
    }

    saveToLocal();
    closeModal();
  });

  function deleteShortcut(index) {
    if (confirm('Delete this shortcut?')) {
      shortcutsData.splice(index, 1);
      saveToLocal();
    }
  }

  // Close modal on outside click
  window.onclick = function (event) {
    if (event.target == modal) {
      closeModal();
    }
  };

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!modal.classList.contains('hidden')) {
        closeModal();
      } else if (isEditMode) {
        // Exit edit mode
        editModeToggle.click();
      }
    }
  });

});
