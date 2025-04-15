const scripts = [
  {
    id: "script1",
    title: "Auto Jump",
    description: "Automatically jumps when near obstacles to maintain movement flow",
    category: "Utility",
    code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/lyraEz/lol/refs/heads/main/loaders/AJ.lua"))()`,
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
    views: "77.9K",
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