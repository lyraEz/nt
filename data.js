const scripts = [
  {
    id: "script1",
    title: "Auto Jump",
    description: "Automatically jumps when near obstacles to maintain movement flow",
    category: "Utility",
    code: `local autoJump = false
local keybind = "F"
local floatingButton = nil  -- Armazena o botão flutuante (se criado)

-- GUI Setup
local player = game.Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")

-- Criação do ScreenGui no início
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AutoJumpHub"
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

-- Main Hub Frame (aumentado)
local mainFrame = Instance.new("Frame")
mainFrame.Size = UDim2.new(0, 220, 0, 170)
mainFrame.Position = UDim2.new(0.5, -110, 0.1, 0)
mainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
mainFrame.BorderSizePixel = 0
mainFrame.Parent = screenGui

local hubCorner = Instance.new("UICorner")
hubCorner.CornerRadius = UDim.new(0, 10)
hubCorner.Parent = mainFrame

-- Title Bar (tema mais escuro)
local titleBar = Instance.new("Frame")
titleBar.Size = UDim2.new(1, 0, 0, 30)
titleBar.BackgroundColor3 = Color3.fromRGB(35, 35, 35)
titleBar.BorderSizePixel = 0
titleBar.Parent = mainFrame

local titleCorner = Instance.new("UICorner")
titleCorner.CornerRadius = UDim.new(0, 10)
titleCorner.Parent = titleBar

local title = Instance.new("TextLabel")
title.Size = UDim2.new(0.7, 0, 1, 0)
title.Position = UDim2.new(0, 10, 0, 0)
title.BackgroundTransparency = 1
title.Text = "Auto Jump"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.TextSize = 18
title.Font = Enum.Font.GothamBold
title.TextXAlignment = Enum.TextXAlignment.Left
title.Parent = titleBar

-- Botão de minimizar
local minimizeButton = Instance.new("TextButton")
minimizeButton.Size = UDim2.new(0, 30, 0, 30)
minimizeButton.Position = UDim2.new(1, -30, 0, 0)
minimizeButton.BackgroundTransparency = 1
minimizeButton.Text = "-"
minimizeButton.TextColor3 = Color3.fromRGB(255, 255, 255)
minimizeButton.TextSize = 24
minimizeButton.Font = Enum.Font.GothamBold
minimizeButton.Parent = titleBar

-- Botão Status (tema mais escuro)
local statusButton = Instance.new("TextButton")
local statusGradient = Instance.new("UIGradient")
statusGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(200, 0, 0)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(200, 80, 80))
})
statusGradient.Parent = statusButton
statusButton.Size = UDim2.new(0, 200, 0, 25)
statusButton.Position = UDim2.new(0, 10, 0, 35)
statusButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
statusButton.Text = "Auto Jump OFF"
statusButton.TextColor3 = Color3.fromRGB(255, 255, 255)
statusButton.TextSize = 14
statusButton.Font = Enum.Font.GothamSemibold
statusButton.Parent = mainFrame
local statusCorner = Instance.new("UICorner")
statusCorner.CornerRadius = UDim.new(0, 6)
statusCorner.Parent = statusButton

-- Lógica do Auto Jump (depois de criar os elementos da UI)
local function toggleAutoJump()
    print("toggleAutoJump chamado - estado atual:", autoJump)  -- Debug
    autoJump = not autoJump
    print("Novo estado do autoJump:", autoJump)  -- Debug

    -- Atualizando o botão de status
    statusButton.Text = autoJump and "Auto Jump ON" or "Auto Jump OFF"
    statusGradient.Color = autoJump and
        ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 255, 100)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(0, 200, 100))
        }) or
        ColorSequence.new({
            ColorSequenceKeypoint.new(0, Color3.fromRGB(200, 0, 0)),
            ColorSequenceKeypoint.new(1, Color3.fromRGB(200, 80, 80))
        })

    -- Atualizando o botão flutuante
    if floatingButton then
        print("Atualizando botão flutuante")  -- Debug
        floatingButton.Text = autoJump and "Auto Jump ON" or "Auto Jump OFF"
        local fbGradient = floatingButton:FindFirstChildOfClass("UIGradient")
        if fbGradient then
            fbGradient.Color = autoJump and
                ColorSequence.new({
                    ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 255, 100)),
                    ColorSequenceKeypoint.new(1, Color3.fromRGB(0, 200, 100))
                }) or
                ColorSequence.new({
                    ColorSequenceKeypoint.new(0, Color3.fromRGB(200, 0, 0)),
                    ColorSequenceKeypoint.new(1, Color3.fromRGB(200, 80, 80))
                })
        end
    end
end

-- Botão Keybind (tema mais escuro)
local keybindButton = Instance.new("TextButton")
keybindButton.Size = UDim2.new(0, 200, 0, 25)
keybindButton.Position = UDim2.new(0, 10, 0, 70)
keybindButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
keybindButton.Text = "KEYBIND: " .. keybind
keybindButton.TextColor3 = Color3.fromRGB(255, 255, 255)
keybindButton.TextSize = 14
keybindButton.Font = Enum.Font.GothamSemibold
keybindButton.Parent = mainFrame
local keybindGradient = Instance.new("UIGradient")
keybindGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(50, 50, 180)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(80, 80, 230))
})
keybindGradient.Parent = keybindButton
local keybindCorner = Instance.new("UICorner")
keybindCorner.CornerRadius = UDim.new(0, 6)
keybindCorner.Parent = keybindButton

-- Botão Floating Button (para criar o botão flutuante)
local floatingButtonCreator = Instance.new("TextButton")
floatingButtonCreator.Size = UDim2.new(0, 200, 0, 25)
floatingButtonCreator.Position = UDim2.new(0, 10, 0, 105)
floatingButtonCreator.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
floatingButtonCreator.Text = "Floating Button"
floatingButtonCreator.TextColor3 = Color3.fromRGB(255, 255, 255)
floatingButtonCreator.TextSize = 14
floatingButtonCreator.Font = Enum.Font.GothamSemibold
floatingButtonCreator.Parent = mainFrame

local floatingGradient = Instance.new("UIGradient")
floatingGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(50, 50, 180)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(80, 80, 230))
})
floatingGradient.Parent = floatingButtonCreator
local floatingCorner = Instance.new("UICorner")
floatingCorner.CornerRadius = UDim.new(0, 6)
floatingCorner.Parent = floatingButtonCreator

-- Criando um container para os botões inferiores
local bottomButtonsContainer = Instance.new("Frame")
bottomButtonsContainer.Size = UDim2.new(1, 0, 0, 30)
bottomButtonsContainer.Position = UDim2.new(0, 0, 0, 135)
bottomButtonsContainer.BackgroundTransparency = 1
bottomButtonsContainer.Parent = mainFrame

-- Botão Hide Hub (parte inferior, lado esquerdo)
local hideHubButton = Instance.new("TextButton")
hideHubButton.Size = UDim2.new(0, 100, 0, 25)
hideHubButton.Position = UDim2.new(0, 10, 0, 0)  -- Posição relativa ao container
hideHubButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
hideHubButton.Text = "HIDE HUB"
hideHubButton.TextColor3 = Color3.fromRGB(255, 255, 255)
hideHubButton.TextSize = 14
hideHubButton.Font = Enum.Font.GothamSemibold
hideHubButton.Parent = bottomButtonsContainer

local hideGradient = Instance.new("UIGradient")
hideGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(130, 40, 130)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(170, 90, 170))
})
hideGradient.Parent = hideHubButton

local hideCorner = Instance.new("UICorner")
hideCorner.CornerRadius = UDim.new(0, 6)
hideCorner.Parent = hideHubButton

-- Botão Discord (parte inferior, lado direito)
local discordButton = Instance.new("TextButton")
discordButton.Size = UDim2.new(0, 100, 0, 25)
discordButton.Position = UDim2.new(0, 111, 0, 0)  -- Posição relativa ao container
discordButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
discordButton.Text = "Discord"
discordButton.TextColor3 = Color3.fromRGB(255, 255, 255)
discordButton.TextSize = 14
discordButton.Font = Enum.Font.GothamSemibold
discordButton.Parent = bottomButtonsContainer

local discordGradient = Instance.new("UIGradient")
discordGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(40, 80, 120)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(90, 120, 170))
})
discordGradient.Parent = discordButton

local discordCorner = Instance.new("UICorner")
discordCorner.CornerRadius = UDim.new(0, 6)
discordCorner.Parent = discordButton


-- Cria o botão flutuante ao clicar em "Floating Button"
floatingButtonCreator.MouseButton1Click:Connect(function()
    if not floatingButton then
        print("Criando botão flutuante")  -- Debug
        floatingButton = Instance.new("TextButton")
        floatingButton.Size = UDim2.new(0, 100, 0, 30)
        floatingButton.Position = UDim2.new(0.5, -50, 0.9, -40)
        floatingButton.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
        floatingButton.Text = autoJump and "Auto Jump ON" or "Auto Jump OFF"
        floatingButton.TextColor3 = Color3.fromRGB(255, 255, 255)
        floatingButton.TextSize = 14
        floatingButton.Font = Enum.Font.GothamSemibold
        floatingButton.Parent = screenGui

        local fbGradient = Instance.new("UIGradient")
        fbGradient.Color = autoJump and
            ColorSequence.new({
                ColorSequenceKeypoint.new(0, Color3.fromRGB(0, 255, 100)),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(0, 200, 100))
            }) or
            ColorSequence.new({
                ColorSequenceKeypoint.new(0, Color3.fromRGB(200, 0, 0)),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(200, 80, 80))
            })
        fbGradient.Parent = floatingButton

        local fbCorner = Instance.new("UICorner")
        fbCorner.CornerRadius = UDim.new(0, 6)
        fbCorner.Parent = floatingButton

        -- Variáveis para controle de arrasto
        local isDragging = false
        local dragStartPos = nil
        local buttonStartPos = nil
        local moveThreshold = 5  -- pixels mínimos para considerar como arrasto

        -- Eventos de mouse para arrastar e clicar
        floatingButton.MouseButton1Down:Connect(function(x, y)
            print("MouseButton1Down no botão flutuante")  -- Debug
            isDragging = false  -- Começa como clique até mover além do threshold
            dragStartPos = Vector2.new(x, y)
            buttonStartPos = floatingButton.Position
        end)

        floatingButton.MouseMoved:Connect(function(x, y)
            if dragStartPos then
                local currentPos = Vector2.new(x, y)
                local delta = currentPos - dragStartPos

                -- Se moveu além do threshold, considera como arrasto
                if not isDragging and (math.abs(delta.X) > moveThreshold or math.abs(delta.Y) > moveThreshold) then
                    isDragging = true
                end

                if isDragging then
                    floatingButton.Position = UDim2.new(
                        buttonStartPos.X.Scale,
                        buttonStartPos.X.Offset + delta.X,
                        buttonStartPos.Y.Scale,
                        buttonStartPos.Y.Offset + delta.Y
                    )
                end
            end
        end)

        floatingButton.MouseButton1Up:Connect(function()
            print("MouseButton1Up no botão flutuante")  -- Debug
            if dragStartPos then
                -- Se não entrou no modo de arrasto, considera como clique
                if not isDragging then
                    print("Clique detectado - chamando toggleAutoJump")  -- Debug
                    toggleAutoJump()
                end
                dragStartPos = nil
                buttonStartPos = nil
            end
        end)
    end
end)

-- Tornar a hub arrastável
local isDragging = false
local dragStart, startPos = nil, nil
titleBar.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch then
        isDragging = true
        dragStart = input.Position
        startPos = mainFrame.Position
        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                isDragging = false
            end
        end)
    end
end)

titleBar.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
        if isDragging then
            local delta = input.Position - dragStart
            mainFrame.Position = UDim2.new(
                startPos.X.Scale,
                startPos.X.Offset + delta.X,
                startPos.Y.Scale,
                startPos.Y.Offset + delta.Y
            )
        end
    end
end)

-- Funcionalidade de minimizar a hub (atualizada)
local isMinimized = false
local originalSize = mainFrame.Size
minimizeButton.MouseButton1Click:Connect(function()
    isMinimized = not isMinimized
    print("Minimizando hub:", isMinimized)  -- Debug


    local elementsToToggle = {
        statusButton,
        keybindButton,
        floatingButtonCreator,
        bottomButtonsContainer  -- Agora controlamos o container inteiro
    }

    if isMinimized then
        -- Primeiro esconde todos os elementos
        for i, element in ipairs(elementsToToggle) do
            if element then  -- Verifica se o elemento existe
                print("Escondendo elemento", i)  -- Debug
                element.Visible = false
            end
        end

        -- Depois altera o tamanho da hub
        mainFrame.Size = UDim2.new(0, 220, 0, 30)
        minimizeButton.Text = "+"
    else
        -- Primeiro restaura o tamanho original
        mainFrame.Size = originalSize
        minimizeButton.Text = "-"

        -- Depois mostra todos os elementos
        for i, element in ipairs(elementsToToggle) do
            if element then  -- Verifica se o elemento existe
                print("Mostrando elemento", i)  -- Debug
                element.Visible = true
            end
        end
    end
end)

-- Tornar o botão de status clicável
statusButton.MouseButton1Click:Connect(toggleAutoJump)

-- Funcionalidade do Keybind
local isSettingKeybind = false
keybindButton.MouseButton1Click:Connect(function()
    isSettingKeybind = true
    keybindButton.Text = "PRESS ANY KEY..."
end)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
    if isSettingKeybind and input.KeyCode and input.KeyCode.Name ~= "Unknown" then
        keybind = input.KeyCode.Name
        keybindButton.Text = "KEYBIND: " .. keybind
        isSettingKeybind = false
    elseif not gameProcessed and input.KeyCode == Enum.KeyCode[keybind] then
        toggleAutoJump()
    end
end)

-- Auto Jump: executa o pulo se ativado
RunService.RenderStepped:Connect(function()
    if autoJump and player.Character then
        local humanoid = player.Character:FindFirstChildOfClass("Humanoid")
        if humanoid and humanoid.FloorMaterial ~= Enum.Material.Air then
            humanoid.Jump = true
        end
    end
end)

-- Criação do Confirmation Dialog (para o Hide Hub)
local confirmDialog = Instance.new("Frame")
confirmDialog.Size = UDim2.new(0, 250, 0, 130)
confirmDialog.Position = UDim2.new(0.5, -125, 0.5, -65)
confirmDialog.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
confirmDialog.BorderSizePixel = 0
confirmDialog.Visible = false
confirmDialog.Parent = screenGui
local dialogCorner = Instance.new("UICorner")
dialogCorner.CornerRadius = UDim.new(0, 10)
dialogCorner.Parent = confirmDialog
local dialogGradient = Instance.new("UIGradient")
dialogGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(40, 40, 40)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(50, 50, 50))
})
dialogGradient.Parent = confirmDialog
local dialogText = Instance.new("TextLabel")
dialogText.Size = UDim2.new(1, 0, 0, 50)
dialogText.Position = UDim2.new(0, 0, 0, 10)
dialogText.BackgroundTransparency = 1
dialogText.Text = "Hide the Auto Jump Hub?"
dialogText.TextColor3 = Color3.fromRGB(255, 255, 255)
dialogText.TextSize = 18
dialogText.Font = Enum.Font.GothamBold
dialogText.Parent = confirmDialog
local yesButton = Instance.new("TextButton")
yesButton.Size = UDim2.new(0.4, 0, 0, 35)
yesButton.Position = UDim2.new(0.08, 0, 0.6, 0)
yesButton.BackgroundColor3 = Color3.fromRGB(40, 180, 40)
yesButton.Text = "Yes"
yesButton.TextColor3 = Color3.fromRGB(255, 255, 255)
yesButton.TextSize = 16
yesButton.Font = Enum.Font.GothamSemibold
yesButton.Parent = confirmDialog
local yesCorner = Instance.new("UICorner")
yesCorner.CornerRadius = UDim.new(0, 6)
yesCorner.Parent = yesButton
local noButton = Instance.new("TextButton")
noButton.Size = UDim2.new(0.4, 0, 0, 35)
noButton.Position = UDim2.new(0.52, 0, 0.6, 0)
noButton.BackgroundColor3 = Color3.fromRGB(180, 40, 40)
noButton.Text = "No"
noButton.TextColor3 = Color3.fromRGB(255, 255, 255)
noButton.TextSize = 16
noButton.Font = Enum.Font.GothamSemibold
noButton.Parent = confirmDialog
local noCorner = Instance.new("UICorner")
noCorner.CornerRadius = UDim.new(0, 6)
noCorner.Parent = noButton


-- Conecta o Hide Hub para exibir o diálogo de confirmação
hideHubButton.MouseButton1Click:Connect(function()
    confirmDialog.Visible = true
end)

-- Mensagem minimalista "Link copied"
local copiedMessage = Instance.new("TextLabel")
copiedMessage.Size = UDim2.new(0, 120, 0, 30)
copiedMessage.Position = UDim2.new(0.5, -60, 0.8, -40)
copiedMessage.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
copiedMessage.Text = "Link copied"
copiedMessage.TextColor3 = Color3.fromRGB(255, 255, 255)
copiedMessage.TextSize = 14
copiedMessage.Font = Enum.Font.GothamSemibold
copiedMessage.Visible = false
copiedMessage.Parent = screenGui
local msgCorner = Instance.new("UICorner")
msgCorner.CornerRadius = UDim.new(0, 6)
msgCorner.Parent = copiedMessage
local msgGradient = Instance.new("UIGradient")
msgGradient.Color = ColorSequence.new({
    ColorSequenceKeypoint.new(0, Color3.fromRGB(40, 80, 120)),
    ColorSequenceKeypoint.new(1, Color3.fromRGB(90, 120, 170))
})
msgGradient.Parent = copiedMessage

-- Funcionalidade do botão Discord: copia o link e exibe a mensagem
discordButton.MouseButton1Click:Connect(function()
    setclipboard("https://discord.gg/FA3eVAdtfw")
    print("Link copiado para a área de transferência!")
    copiedMessage.Visible = true
    delay(2, function()
        copiedMessage.Visible = false
    end)
end)

-- Conecta os botões do diálogo de confirmação
yesButton.MouseButton1Click:Connect(function()
    confirmDialog.Visible = false
    mainFrame.Visible = false
end)

noButton.MouseButton1Click:Connect(function()
    confirmDialog.Visible = false
end)`,
    views: "3.3K",
    timeAgo: "1 month ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/2632096-1742326502991.png"
  },
  {
    id: "script2",
    title: "HDR GRAPHICS",
    description: "Enhances game visuals with HDR-like effects for improved graphics",
    category: "Graphics",
    code: `local Player = game:GetService("Players").LocalPlayer
local Gui = Instance.new("ScreenGui", Player.PlayerGui)
Gui.Name = "DeepHubPro"
Gui.ResetOnSpawn = false
Gui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")
local EASE = Enum.EasingStyle.Quint
local AMOLED_THEME = {
    Background = Color3.fromHex("#000000"),
    Surface = Color3.fromHex("#121212"),
    Text = Color3.fromHex("#FFFFFF"),
    Accent = Color3.fromHex("#00FFFF")
}

local MainFrame = Instance.new("Frame", Gui)
MainFrame.Size = UDim2.new(0.7, 0, 0.6, 0)
MainFrame.Position = UDim2.new(0.5, 0, 0.5, 0)
MainFrame.AnchorPoint = Vector2.new(0.5, 0.5)
MainFrame.BackgroundColor3 = AMOLED_THEME.Surface
MainFrame.BackgroundTransparency = 0.25
MainFrame.ClipsDescendants = true

local Corner = Instance.new("UICorner", MainFrame)
Corner.CornerRadius = UDim.new(0, 8)

local UIStroke = Instance.new("UIStroke", MainFrame)
UIStroke.Color = AMOLED_THEME.Accent
UIStroke.Thickness = 1
UIStroke.Transparency = 0.5

local Header = Instance.new("Frame", MainFrame)
Header.Size = UDim2.new(1, 0, 0.15, 0)
Header.BackgroundColor3 = AMOLED_THEME.Surface
Header.BorderSizePixel = 0

local HeaderCorner = Instance.new("UICorner", Header)
HeaderCorner.CornerRadius = UDim.new(0, 6)

local HeaderStroke = Instance.new("UIStroke", Header)
HeaderStroke.Color = AMOLED_THEME.Accent
HeaderStroke.Thickness = 1
HeaderStroke.Transparency = 0.5

local Title = Instance.new("TextLabel", Header)
Title.Size = UDim2.new(0.7, 0, 1, 0)
Title.Text = "   DEEP GRAPHICS HUB"
Title.Font = Enum.Font.GothamBold
Title.TextSize = 16
Title.TextColor3 = AMOLED_THEME.Accent
Title.TextXAlignment = Enum.TextXAlignment.Left
Title.BackgroundTransparency = 1

local CloseButton = Instance.new("TextButton", Header)
CloseButton.Size = UDim2.new(0.15, 0, 1, 0)
CloseButton.Position = UDim2.new(0.85, 0, 0, 0)
CloseButton.Text = "×"
CloseButton.TextColor3 = AMOLED_THEME.Text
CloseButton.TextSize = 28
CloseButton.BackgroundTransparency = 1

local GraphicPresets = {
    ["ULTRA CINEMATIC"] = function()
        local Lighting = game:GetService("Lighting")
        local RunService = game:GetService("RunService")

        local function ultraRealisticGraphics()
            settings().Rendering.QualityLevel = 21
            settings().Rendering.EnableFRM = true
            settings().Rendering.MeshCacheSize = 1000

            Lighting.GlobalShadows = true
            Lighting.EnvironmentDiffuseScale = 0.5
            Lighting.EnvironmentSpecularScale = 1.0
            Lighting.ClockTime = 14
            Lighting.GeographicLatitude = 45

            local atmosphere = Instance.new("Atmosphere")
            atmosphere.Density = 0.3
            atmosphere.Offset = 0.5
            atmosphere.Color = Color3.new(0.8, 0.75, 1)
            atmosphere.Decay = Color3.new(0.8, 0.8, 0.9)
            atmosphere.Glare = 0.1
            atmosphere.Haze = 1
            atmosphere.Parent = Lighting

            local bloom = Instance.new("BloomEffect")
            bloom.Intensity = 0.4
            bloom.Size = 24
            bloom.Threshold = 2
            bloom.Parent = Lighting

            local colorCorrection = Instance.new("ColorCorrectionEffect")
            colorCorrection.Brightness = 0.05
            colorCorrection.Contrast = 0.1
            colorCorrection.Saturation = 0.1
            colorCorrection.TintColor = Color3.fromRGB(255, 220, 190)
            colorCorrection.Parent = Lighting

            local depthOfField = Instance.new("DepthOfFieldEffect")
            depthOfField.FarIntensity = 0.1
            depthOfField.FocusDistance = 50
            depthOfField.InFocusRadius = 30
            depthOfField.NearIntensity = 0.3
            depthOfField.Parent = Lighting

            Lighting.ExposureCompensation = 0.33
            Lighting.Saturation = 0.1
            Lighting.Brightness = 2

            RunService.RenderStepped:Connect(function()
                Lighting.EnvironmentDiffuseScale = math.sin(time() * 0.5) * 0.2 + 0.5
                Lighting.EnvironmentSpecularScale = math.cos(time() * 0.5) * 0.2 + 0.8
            end)
        end

        ultraRealisticGraphics()
    end,
    
    ["BALANCED"] = function()
        local Lighting = game:GetService("Lighting")
        local RunService = game:GetService("RunService")

        local function balancedGraphics()
            settings().Rendering.QualityLevel = 10
            settings().Rendering.EnableFRM = true
            settings().Rendering.MeshCacheSize = 500

            Lighting.GlobalShadows = false
            Lighting.EnvironmentDiffuseScale = 0.3
            Lighting.EnvironmentSpecularScale = 0.5
            Lighting.ClockTime = 14
            Lighting.GeographicLatitude = 45

            local atmosphere = Instance.new("Atmosphere")
            atmosphere.Density = 0.2
            atmosphere.Offset = 0.3
            atmosphere.Color = Color3.new(0.8, 0.75, 1)
            atmosphere.Decay = Color3.new(0.8, 0.8, 0.9)
            atmosphere.Glare = 0.05
            atmosphere.Haze = 0.5
            atmosphere.Parent = Lighting

            local bloom = Instance.new("BloomEffect")
            bloom.Intensity = 0.2
            bloom.Size = 12
            bloom.Threshold = 1.5
            bloom.Parent = Lighting

            local colorCorrection = Instance.new("ColorCorrectionEffect")
            colorCorrection.Brightness = 0.02
            colorCorrection.Contrast = 0.05
            colorCorrection.Saturation = 0.05
            colorCorrection.TintColor = Color3.fromRGB(255, 220, 190)
            colorCorrection.Parent = Lighting

            local depthOfField = Instance.new("DepthOfFieldEffect")
            depthOfField.Enabled = false

            Lighting.ExposureCompensation = 0.2
            Lighting.Saturation = 0.05
            Lighting.Brightness = 1.5
        end

        balancedGraphics()
    end,
    
    ["MAXIMUM PERFORMANCE"] = function()
        local Lighting = game:GetService("Lighting")
        local RunService = game:GetService("RunService")

        local function genericParticles()
            settings().Rendering.QualityLevel = 10
            settings().Rendering.EnableFRM = true
            settings().Rendering.MeshCacheSize = 500

            Lighting.GlobalShadows = false
            Lighting.EnvironmentDiffuseScale = 0.3
            Lighting.EnvironmentSpecularScale = 0.5
            Lighting.ClockTime = 14
            Lighting.GeographicLatitude = 45

            local atmosphere = Instance.new("Atmosphere")
            atmosphere.Density = 0.2
            atmosphere.Offset = 0.3
            atmosphere.Color = Color3.new(0.8, 0.75, 1)
            atmosphere.Decay = Color3.new(0.8, 0.8, 0.9)
            atmosphere.Glare = 0.05
            atmosphere.Haze = 0.5
            atmosphere.Parent = Lighting

            local bloom = Instance.new("BloomEffect")
            bloom.Intensity = 0.2
            bloom.Size = 12
            bloom.Threshold = 1.5
            bloom.Parent = Lighting

            local colorCorrection = Instance.new("ColorCorrectionEffect")
            colorCorrection.Brightness = 0.02
            colorCorrection.Contrast = 0.05
            colorCorrection.Saturation = 0.05
            colorCorrection.TintColor = Color3.fromRGB(255, 220, 190)
            colorCorrection.Parent = Lighting

            Lighting.ExposureCompensation = 0.2
            Lighting.Saturation = 0.05
            Lighting.Brightness = 1.5

            local function createGenericParticles(parent)
                local part = Instance.new("ParticleEmitter")
                part.Texture = "rbxassetid://241539427"
                part.Size = NumberSequence.new({
                    NumberSequenceKeypoint.new(0, 0.5),
                    NumberSequenceKeypoint.new(1, 1.5)
                })
                part.Transparency = NumberSequence.new({
                    NumberSequenceKeypoint.new(0, 0.5),
                    NumberSequenceKeypoint.new(1, 1)
                })
                part.Lifetime = NumberRange.new(2, 4)
                part.Rate = 100
                part.Speed = NumberRange.new(5, 10)
                part.Rotation = NumberRange.new(0, 360)
                part.VelocityInheritance = 0.5
                part.Parent = parent
            end

            local part = Instance.new("Part")
            part.Size = Vector3.new(5, 5, 5)
            part.Position = Vector3.new(0, 10, 0)
            part.Anchored = true
            part.Parent = workspace

            createGenericParticles(part)
        end

        genericParticles()
    end
}

local PresetContainer = Instance.new("ScrollingFrame", MainFrame)
PresetContainer.Size = UDim2.new(0.95, 0, 0.8, 0)
PresetContainer.Position = UDim2.new(0.025, 0, 0.18, 0)
PresetContainer.BackgroundTransparency = 1
PresetContainer.ScrollBarThickness = 3

local ContainerStroke = Instance.new("UIStroke", PresetContainer)
ContainerStroke.Color = AMOLED_THEME.Accent
ContainerStroke.Thickness = 1
ContainerStroke.Transparency = 0.5

local Layout = Instance.new("UIListLayout", PresetContainer)
Layout.Padding = UDim.new(0, 12)
Layout.HorizontalAlignment = Enum.HorizontalAlignment.Center

for presetName, func in pairs(GraphicPresets) do
    local Button = Instance.new("TextButton")
    Button.Size = UDim2.new(0.95, 0, 0, 45)
    Button.Text = presetName
    Button.Font = Enum.Font.GothamMedium
    Button.TextSize = 16
    Button.TextColor3 = AMOLED_THEME.Text
    Button.BackgroundColor3 = AMOLED_THEME.Surface
    Button.AutoButtonColor = false

    local ButtonCorner = Instance.new("UICorner", Button)
    ButtonCorner.CornerRadius = UDim.new(0, 6)

    local ButtonStroke = Instance.new("UIStroke", Button)
    ButtonStroke.Color = AMOLED_THEME.Accent
    ButtonStroke.Thickness = 1

    Button.MouseEnter:Connect(function()
        TweenService:Create(Button, TweenInfo.new(0.2), {
            BackgroundColor3 = AMOLED_THEME.Accent,
            TextColor3 = AMOLED_THEME.Surface
        }):Play()
    end)

    Button.MouseLeave:Connect(function()
        TweenService:Create(Button, TweenInfo.new(0.2), {
            BackgroundColor3 = AMOLED_THEME.Surface,
            TextColor3 = AMOLED_THEME.Text
        }):Play()
    end)

    Button.MouseButton1Click:Connect(func)
    Button.Parent = PresetContainer
end

local dragStartPos, frameStartPos, dragging

local function updateInput(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        local delta = input.Position - dragStartPos
        MainFrame.Position = UDim2.new(
            frameStartPos.X.Scale,
            frameStartPos.X.Offset + delta.X,
            frameStartPos.Y.Scale,
            frameStartPos.Y.Offset + delta.Y
        )
    end
end

Header.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        dragging = true
        dragStartPos = input.Position
        frameStartPos = MainFrame.Position
        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                dragging = false
            end
        end)
    end
end)

Header.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        updateInput(input)
    end
end)

local FloatButton = Instance.new("ImageButton", Gui)
FloatButton.Size = UDim2.new(0, 50, 0, 50)
FloatButton.Image = "rbxassetid://11176073582"
FloatButton.ImageColor3 = AMOLED_THEME.Accent
FloatButton.BackgroundColor3 = AMOLED_THEME.Surface
FloatButton.Visible = false
FloatButton.AutoButtonColor = false

local FloatCorner = Instance.new("UICorner", FloatButton)
FloatCorner.CornerRadius = UDim.new(1, 0)
local FloatStroke = Instance.new("UIStroke", FloatButton)
FloatStroke.Color = AMOLED_THEME.Accent
FloatStroke.Thickness = 1

local floatDragStart, floatPosStart

FloatButton.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch then
        floatDragStart = input.Position
        floatPosStart = FloatButton.Position
        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                floatDragStart = nil
            end
        end)
    end
end)

FloatButton.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.Touch and floatDragStart then
        local delta = input.Position - floatDragStart
        FloatButton.Position = UDim2.new(
            floatPosStart.X.Scale,
            floatPosStart.X.Offset + delta.X,
            floatPosStart.Y.Scale,
            floatPosStart.Y.Offset + delta.Y
        )
    end
end)

local minimized = false
local function toggleHub()
    minimized = not minimized
    if minimized then
        TweenService:Create(MainFrame, TweenInfo.new(0.4, EASE), {
            Size = UDim2.new(0, 0, 0, 0),
            BackgroundTransparency = 1
        }):Play()
        FloatButton.Visible = true
    else
        TweenService:Create(MainFrame, TweenInfo.new(0.4, EASE), {
            Size = UDim2.new(0.7, 0, 0.6, 0),
            BackgroundTransparency = 0.25
        }):Play()
        FloatButton.Visible = false
    end
end

CloseButton.MouseButton1Click:Connect(toggleHub)
FloatButton.MouseButton1Click:Connect(toggleHub)

MainFrame.Size = UDim2.new(0, 0, 0, 0)
TweenService:Create(MainFrame, TweenInfo.new(0.8, EASE), {
    Size = UDim2.new(0.7, 0, 0.6, 0),
    BackgroundTransparency = 0.25
}):Play()

FloatButton.Position = UDim2.new(0.9, 0, 0.8, 0)`,
    views: "9.5K",
    timeAgo: "2 months ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/8926319-1739694968515.png"
  },
  {
    id: "script3",
    title: "Korblox R6",
    description: "Applies the Korblox aesthetic to R6 characters",
    category: "Universal Script 🚀",
    code: `local player = game:GetService("Players").LocalPlayer

local function applyKorbloxLeg(char)
    repeat wait() until char:FindFirstChild("Right Leg")

    local rightLeg = char:FindFirstChild("Right Leg")
    if rightLeg then
        rightLeg.Transparency = 1

        local korbloxLeg = Instance.new("Part")
        korbloxLeg.Name = "KorbloxLeg"
        korbloxLeg.Size = Vector3.new(1, 1, 1)
        korbloxLeg.Position = rightLeg.Position
        korbloxLeg.Anchored = false
        korbloxLeg.CanCollide = false
        korbloxLeg.Parent = char

        local mesh = Instance.new("SpecialMesh")
        mesh.MeshId = "http://www.roblox.com/asset/?id=902942093"
        mesh.TextureId = "http://roblox.com/asset/?id=902843398"
        mesh.Scale = Vector3.new(0.8, 0.8, 0.8)
        mesh.Parent = korbloxLeg

        local weld = Instance.new("Weld")
        weld.Part0 = rightLeg
        weld.Part1 = korbloxLeg
        weld.C0 = CFrame.new(0, 0.8, 0)
        weld.Parent = korbloxLeg
    end
end

if player.Character then
    applyKorbloxLeg(player.Character)
end

player.CharacterAdded:Connect(function(char)
    applyKorbloxLeg(char)
end)`,
    views: "21.6K",
    timeAgo: "2 months ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/9483532-1739047236791.png"
  },
  {
    id: "script4",
    title: "Wallhop",
    description: "Jump flick script for wall hopping movement",
    category: "Universal Script 🚀",
    code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/lyraEz/lol/refs/heads/main/loaders/NewWallhop.lua"))()`,
    views: "101.3K",
    timeAgo: "7 months ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/9952968-1726860980712.png"
  },
  {
    id: "script5",
    title: "Streatch Resolution",
    description: "stretch resolution. change only (0.65) 1 is default",
    category: "Universal Script 🚀",
    code: `getgenv().Resolution = {
    [".gg/scripters"] = 0.65
}

local Camera = workspace.CurrentCamera
if getgenv().gg_scripters == nil then
    game:GetService("RunService").RenderStepped:Connect(
        function()
            Camera.CFrame = Camera.CFrame * CFrame.new(0, 0, 0, 1, 0, 0, 0, getgenv().Resolution[".gg/scripters"], 0, 0, 0, 1)
        end
    )
end
getgenv().gg_scripters = "Aori0001"`,
    views: "7.6K",
    timeAgo: "10 months ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/3231639-1718060107949.webp"
  },
  {
    id: "script6",
    title: "Headless",
    description: "Script to become headless it removes head and face accessories ",
    category: "Utility",
    code: `local plr = game.Players.LocalPlayer

local function aplicarHeadless(char)
	local head = char:WaitForChild("Head")
	local humanoid = char:WaitForChild("Humanoid")
    
	for _, v in ipairs(char:GetChildren()) do
		if v:IsA("Accessory") then
			local handle = v:FindFirstChild("Handle")
			if handle then
				local attachment = handle:FindFirstChildWhichIsA("Attachment")
				if attachment and (
					attachment.Name == "HatAttachment" or 
					attachment.Name == "HairAttachment" or 
					attachment.Name == "FaceFrontAttachment" or
					attachment.Name == "FaceCenterAttachment"
				) then
					v:Destroy()
				end
			end
		end
	end
    
	head.Transparency = 1
	if head:FindFirstChild("face") then
		head.face:Destroy()
	end

	local mesh = Instance.new("SpecialMesh", head)
	mesh.MeshType = Enum.MeshType.FileMesh
	mesh.MeshId = "rbxassetid://0"
	mesh.Scale = Vector3.new(0, 0, 0)

	humanoid.HeadScale = 0.01
end

plr.CharacterAdded:Connect(function(char)
	aplicarHeadless(char)
end)

if plr.Character then
	aplicarHeadless(plr.Character)
end`,
    timeAgo: "12 days ago",
    price: "Free",
    image: "https://scriptblox.com/images/script/6839120-1722363877089.png"
  }
];

if (typeof module !== 'undefined') {
  module.exports = { scripts };
}
